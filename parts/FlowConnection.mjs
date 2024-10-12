import FlowEdge from "../primitives/FlowEdge.mjs";
import Point from "../geometry/Point.mjs";
import LineSegment from "../geometry/LineSegment.mjs";
import FlowPort from "../primitives/FlowPort.mjs";
import FlowInPort from "./FlowInPort.mjs";
import FlowOutPort from "./FlowOutPort.mjs";
import Rect from "../geometry/Rect.mjs";

/**
 * A flow object representing an "edge"/line-segment between an output port and an input port.  This is canvas-drawn only, but is positioned relative to existing port DOM elements.
 *
 * With the current implementation, at least one end of the connection must be assigned to a port.  If only one is assigned, the unassigned end will track the mouse position.
 */
export default class FlowConnection extends FlowEdge{ //TODO: abstract so we don't need directional ports?
    /** The child type-name of the connection*/
    connectionType;
    /** The input port that the connection should end at (flow to)
     * @type {FlowInPort|null}*/
    inPort=null;
    /** The output port that the connection should start at (flow from).
     * @type {FlowOutPort|null}*/
    outPort=null;

    /**
     * Construct a new connection
     * @param connectionType the child type-name of the connection
     * @param id An ID value.  If none is provided, a random UUID will be assigned.
     */
    constructor(connectionType,id=null) {
        super('connection',id);
        this.connectionType=connectionType;
    }

    /**
     * Provided an ID Value, retrieve the corresponding {@link FlowPort}, if this connection attaches to it.Otherwise, null is returned.
     * @param id The ID value of the port.
     * @returns {FlowOutPort|FlowInPort|null}
     */
    findPort(id){
        if(this.inPort.id===id) return this.inPort;
        if(this.outPort.id===id) return this.outPort;
        return null;
    }

    /**
     * Connects the line segment to port at the appropriates end (in and out). If a port is already connected at that end, that end of the connection will be replaced with the new port.
     * @param {FlowInPort} inPort
     * @param {FlowOutPort} outPort
     */
    connectPorts(inPort,outPort){
        this.connectInPort(inPort);
        this.connectOutPort(outPort);
    }
    /**
     * Connects the line segment to port at the appropriates end (in or out). If a port is already connected at that end, that end of the connection will be replaced with the new port.
     * @param {FlowInPort} inPort
     */
    connectInPort(inPort){
        this.inPort=inPort; inPort.connectEdge(this);
    }
    /**
     * Connects the line segment to port at the appropriates end (in or out). If a port is already connected at that end, that end of the connection will be replaced with the new port.
     * @param {FlowOutPort} outPort
     */
    connectOutPort(outPort){
        this.outPort=outPort; outPort.connectEdge(this);
    }
    disconnectInPort(){
        this.inPort?.disconnectEdge();
        this.inPort=null;
    }
    disconnectOutPort(){
        this.outPort?.disconnectEdge();
        this.outPort=null;
    }
    /**
     * Connects the line segment to a port at the appropriate end (in or out). If a port is already connected at that end, that end of the connection will be replaced with the new port.
     * @param {FlowInPort|FlowOutPort} port
     */
    connectPort(port){
        if(port instanceof FlowInPort) this.connectInPort(port)
        else if(port instanceof FlowOutPort) this.connectOutPort(port)
        console.log("connection",this,port);
    }
    /** Using an ID value, disconnect the line segment from the corresponding Port, leaving one end unassigned */
    disconnectPort(id){
        if(this.inPort?.id===id) this.disconnectInPort();
        else if(this.outPort?.id===id) this.disconnectOutPort();
    }
    disconnectPorts(){
        this.disconnectInPort();
        this.disconnectOutPort();
    }


    updatePosition(flowGrid){
        if(this.outPort===null && this.inPort===null) throw "Cannot update: need inPort or outPort";
        let $out = this.outPort?.$element;
        let $in = this.inPort?.$element;
        if(!$out && !$in) throw "Cannot update: need inPort or outPort to be rendered onpage";



        this.lineSegment = LineSegment.fromCoordinates(0,0,0,0);//dummy
        this.lineSegment.p1 = flowGrid.getChildInnerPos($in)?.addOffset(FlowPort.CenterOffset) ?? flowGrid.mousePt;
        this.lineSegment.p2 = flowGrid.getChildInnerPos($out)?.addOffset(FlowPort.CenterOffset) ?? flowGrid.mousePt;

        //console.debug("Updated line segment",this.lineSegment,$in,'pts',this.lineSegment.p1,this.lineSegment.p2,'m',flowGrid.mousePt)
    }


    //dummy method - connections do not have a DOM representation; they are canvas-rendered.
    renderElement($, options={thickness:1,color:'red'}) {
        return $([]);
        let $edge = super.renderElement($, options);
        $edge.addClass("flow-connection");
        return $edge;
    }

}