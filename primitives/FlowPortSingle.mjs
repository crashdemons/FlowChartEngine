import FlowPort from "./FlowPort.mjs";

/** A {@link FlowPort} which supports connection to a single edge
 *
 * @abstract
 * */
export default class FlowPortSingle extends FlowPort{
    /** An edge that is connected to the port, or null if there is none.
     * @type {FlowEdge|null} */
    edge;

    constructor(portType,id) {
        super(portType,id);
        this.edge=null;
    }
    /** Store the edge as connected to this port
     * @param {FlowEdge} edge */
    connectEdge(edge){
        this.edge=edge;
        console.log("connect port to edge",this,edge);
    }
    /** Clear the stored edge as it has disconnected.
     *  @returns {FlowEdge|null} the previously connected edge */
    disconnectEdge(){
        let oldEdge = this.edge;
        this.edge=null;
        return this.edge;
    }

}