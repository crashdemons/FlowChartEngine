import FlowEdge from "../primitives/FlowEdge.mjs";
import Point from "../geometry/Point.mjs";
import LineSegment from "../geometry/LineSegment.mjs";
import FlowPort from "../primitives/FlowPort.mjs";
import FlowInPort from "./FlowInPort.mjs";
import FlowOutPort from "./FlowOutPort.js";
import Rect from "../geometry/Rect.mjs";

export default class FlowConnection extends FlowEdge{
    connectionType;
    /** @type {FlowInPort}*/
    inPort
    /** @type {FlowOutPort}*/
    outPort;
    constructor(connectionType,id=null) {
        super('connection',id);
        this.connectionType=connectionType;
    }


    findPort(id){
        if(this.inPort.id===id) return this.inPort;
        if(this.outPort.id===id) return this.outPort;
        return null;
    }
    connectPort(port){
        if(port instanceof FlowInPort) this.inPort=port;
        else if(port instanceof FlowOutPort) this.outPort = port;
    }
    disconnectPort(id){
        if(this.inPort.id===id) this.inPort=null;
        else if(this.outPort.id===id) this.outPort=null;
    }


    /**
     *
     * @param {FlowGrid} flowGrid
     */
    updatePosition(flowGrid){
        if(this.outPort===null && this.inPort===null) throw "Cannot update: need inPort or outPort";
        let $out = this.outPort?.$element;
        let $in = this.inPort?.$element;
        if(!$out && !$in) throw "Cannot update: need inPort or outPort to be rendered onpage";



        this.lineSegment = LineSegment.fromCoordinates(0,0,0,0);//dummy
        this.lineSegment.p1 = flowGrid.getChildPosition($in)?.addOffset(FlowPort.CenterOffset) ?? flowGrid.mousePt;
        this.lineSegment.p2 = flowGrid.getChildPosition($out)?.addOffset(FlowPort.CenterOffset) ?? flowGrid.mousePt;

        console.log("Updated line segment",this.lineSegment,$in,'pts',this.lineSegment.p1,this.lineSegment.p2,'m',flowGrid.mousePt)
    }


    renderElement($, options={thickness:1,color:'red'}) {
        let $edge = super.renderElement($, options);
        $edge.addClass("flow-connection");
        return $edge;
    }

}