import FlowDrawable from "../primitives/FlowDrawable.mjs";
import FlowInPort from "./FlowInPort.mjs";
import FlowOutPort from "./FlowOutPort.js";
import FlowBox from "../primitives/FlowBox.mjs";
import FlowObject from "../primitives/FlowObject.mjs";

export default class FlowNode extends FlowBox{
    nodeType;

    /** @type {FlowInPort[]} */
    inPorts = [];
    /** @type {FlowOutPort[]} */
    outPorts =[];

    //orientation='V';

    /** @return {FlowPort[]} */
    get ports(){ return [...this.inPorts,...this.outPorts]}
    constructor(nodeType,id=null) {
        super('node',id);
        this.nodeType=nodeType;
    }

    /** @param {FlowInPort} port*/
    attachInPort(port){
        this.inPorts.push(port);
        port.setParent(this);
    }
    /** @param {FlowOutPort} port*/
    attachOutPort(port){
        this.outPorts.push(port);
        port.setParent(this);
    }
    addInPort(type,id=null){
        let port = new FlowInPort(type,id);
        this.attachInPort(port);
        return port;
    }
    addOutPort(type,id=null){
        let port = new FlowOutPort(type,id);
        this.attachOutPort(port);
        return port;
    }

    renderElement($,options={}) {
        let left = +this.point?.x;
        let top = +this.point?.y;

        let $all = $([]);
        for(let port of this.ports){
            $all.add( port.render($) );
        }

        let $grid =super.renderElement($);
        $grid.removeClass('flow-box').addClass('flow-node');
        $grid.attr('style',`left:${left}px;top:${top}px`);
        $grid.attr('data-flow-node-type',this.nodeType);


        //$grid = $(`<div class="flow-node" style="left:${left}px;top:${top}px">`);
        let $top= $('<div class="flow-node-ports flow-node-ports-h flow-node-ports-top">')
        this.inPorts.map(port=>port.render($)).forEach($el=>$top.append($el))
        let $left= $('<div class="flow-node-ports flow-node-ports-v flow-node-ports-left">')
        let $right= $('<div class="flow-node-ports flow-node-ports-v flow-node-ports-right">')
        let $bottom= $('<div class="flow-node-ports flow-node-ports-h flow-node-ports-bottom">')
        this.outPorts.map(port=>port.render($)).forEach($el=>$bottom.append($el))

        $grid.append($top);
        $grid.append($left);
        $grid.append($right);
        $grid.append($bottom);


        let $box = super.renderElement($);
        $box.addClass("flow-node-box-center");
        $box.removeAttr('id');

        $grid.append($box);


        $all = $all.add($grid);
        //debugger;



        return $all;
    }

}