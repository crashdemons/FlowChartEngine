import FlowDrawable from "./FlowDrawable.mjs";
import Point from "../geometry/Point.mjs";

/** @abstract */
export default class FlowPort extends FlowDrawable{
    portType;
    /** @type {FlowNode} */
    parent;

    static Width=8;
    static Height=8;

    static get CenterOffset(){
        return new Point(
            FlowPort.Width/2,
            FlowPort.Height/2
        );
    }
    constructor(portType,id) {
        super('port',id);
        this.portType=portType;
    }

    /** @param {FlowNode} parent */
    setParent(parent){
        this.parent=parent;
    }

    renderElement($,options={}){
        let instanceId = (""+Math.random()).substring(2);
        return $(`<div class="flow-port" id="fo-${instanceId}">`);
    }

}