import FlowLine from "./FlowLine.mjs";
import LineSegment from "../geometry/LineSegment.mjs";
import FlowPort from "../primitives/FlowPort.mjs";

/**
 * A flow object representing a non-directional "edge"/line-segment between two ports.  This is canvas-drawn only, but is positioned relative to existing port DOM elements.
 *
 * With the current implementation, at least one end of the connection must be assigned to a port.  If only one is assigned, the unassigned end will track the mouse position.
 */
export default class FlowEdge extends FlowLine { //TODO: abstract so we don't need directional ports?
    /** @constant
     * @type {0}*/
    static PORT_START = 0;
    /** @constant
     * @type {1}*/
    static PORT_END = 1;
    
    /** The child type-name of the connection*/
    connectionType;

    /** The ports that the connection is attached to, with the first being the start and the second being the end
     * @type {[FlowPort|null,FlowPort|null]}
     * */
    ports = [null, null];


    /**
     * Construct a new connection
     * @param connectionType the child type-name of the connection
     * @param id An ID value.  If none is provided, a random UUID will be assigned.
     */
    constructor(connectionType, id = null) {
        super('connection', id);
        this.connectionType = connectionType;
    }

    /** @protected */
    _connectPort(iPort, port) {
        this.ports[iPort] = port;
        // noinspection JSDeprecatedSymbols
        port.connectEdge(this);
    }

    /** @protected */
    _disconnectPort(iPort, port) {
        // noinspection JSDeprecatedSymbols
        this.ports[iPort]?.disconnectEdge();
        this.ports[iPort] = null;
    }

    /**
     * Connect the starting port of the connection. If one is attached, it will be replaced
     * @param {FlowPort} port
     */
    connectStart(port) {
        this._connectPort(FlowEdge.PORT_START, port);
    }

    /**
     * Connect the ending port of the connection. If one is attached, it will be replaced
     * @param {FlowPort} port
     */
    connectEnd(port) {
        this._connectPort(FlowEdge.PORT_END, port);
    }

    get startPort(){
        return this.ports[FlowEdge.PORT_START];
    }
    get endPort(){
        return this.ports[FlowEdge.PORT_END];
    }


    disconnectStart() {
        this._disconnectPort(FlowEdge.PORT_START);
    }

    disconnectEnd() {
        this._disconnectPort(FlowEdge.PORT_END);
    }

    /** Using an ID value, disconnect the line segment from the corresponding Port, leaving one end unassigned */
    disconnectPort(id) {
        let idx = this._findPort(id);
        if (idx === -1) return;
        this._disconnectPort(idx);
    }


    /**
     * Provided an ID Value, retrieve the corresponding {@link FlowPort}, if this connection attaches to it.Otherwise, null is returned.
     * @param id The ID value of the port.
     * @returns {FlowPort|null}
     */
    findPort(id) {
        for (let port of this.ports) if (port?.id === id) return port;
        return null;
    }

    /** @protected */
    _findPort(id) {
        for (let i = 0; i < this.ports.length; i++) if (this.ports[i]?.id === id) return i;
        return -1;
    }

    _getConnectedNode(i){
        return this.ports[i]?.parentNode;
    }
    getNodeConnections(){
        return {
            start: this._getConnectedNode(FlowEdge.PORT_START),
            end: this._getConnectedNode(FlowEdge.PORT_END),
        };
    }

    /** @return {FlowNode[]} */
    getConnectedNodes(){
        return this.ports.map(port=>port?.parentNode).filter(node=>node!==null);
    }


    /**
     * Connects the line segment to port at the appropriates end (in and out). If a port is already connected at that end, that end of the connection will be replaced with the new port.
     * @param {FlowPort} inPort
     * @param {FlowPort} outPort
     */
    connectPorts(inPort, outPort) {
        this.connectStart(inPort);
        this.connectEnd(outPort);
    }

    disconnectPorts() {
        this.disconnectStart();
        this.disconnectEnd();
    }

    get isTrackingMouse(){
        //console.log("flowconntrackports",this.ports);
        return (this.ports[0] === null || this.ports[1] === null)
    }

    updatePosition(flowGrid) {
        if (this.ports[0] === null && this.ports[1] === null) throw "Cannot update: need at least one port attached to the connection";
        let $start = this.ports[FlowEdge.PORT_START]?.$element;
        let $end = this.ports[FlowEdge.PORT_END]?.$element;
        if (!$start && !$end) throw "Cannot update: need inPort or outPort to be rendered onpage";


        this.lineSegment = LineSegment.fromCoordinates(0, 0, 0, 0);//dummy
        this.lineSegment.p1 = flowGrid.getChildInnerPos($start)?.addOffset(FlowPort.CenterOffset) ?? flowGrid.mousePt;
        this.lineSegment.p2 = flowGrid.getChildInnerPos($end)?.addOffset(FlowPort.CenterOffset) ?? flowGrid.mousePt;

        //console.debug("Updated line segment",this.lineSegment,$in,'pts',this.lineSegment.p1,this.lineSegment.p2,'m',flowGrid.mousePt)
    }


    //dummy method - connections do not have a DOM representation; they are canvas-rendered.
    renderElement($, options = {thickness: 1, color: 'red'}) {
        return $([]);
        let $edge = super.renderElement($, options);
        $edge.addClass("flow-connection");
        return $edge;
    }

}