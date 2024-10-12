import FlowPort from "./FlowPort.mjs";

/** A {@link FlowPort} which only supports connection to a single edge
 *
 * @abstract
 * */
export default class FlowPortSingle extends FlowPort {
    constructor(portType, id) {
        super(portType, id);
        this.edge = null;
    }

    /** An edge that is connected to the port, or null if there is none.
     * @type {FlowEdge|null} */
    get edge() {
        return this.edges[0];
    }

    /** Store the edge as connected to this port
     * @param {FlowEdge} edge */
    connectEdge(edge) {
        this.edges = [edge];
        console.log("connect port to edge", this, edge);
    }

    /** Clear the stored edge as it has disconnected.
     *  @returns {FlowEdge|null} the previously connected edge */
    disconnectEdge() {
        let oldEdge = this.edge;
        this.edges = [];
        return oldEdge;
    }

}