import FlowDrawable from "../primitives/FlowDrawable.mjs";
import FlowInPort from "./FlowInPort.mjs";
import FlowOutPort from "./FlowOutPort.js";
import FlowBox from "../primitives/FlowBox.mjs";
import FlowObject from "../primitives/FlowObject.mjs";

/**
 * A flowchart object representing a connectible Node in the chart.  This object is positioned with the {@link point} property.
 *
 * A node is represented by an inner {@link FlowBox} (or 'card') and an outer container which has top,left,right,and bottom "faces" where {@link FlowPort}s can attach.
 *
 * Please refer to this diagram {@link https://i.imgur.com/hiwyJyB.png}.
 *
 * At this time, only the vertical orientation is used so that 'input' ports appear at the top face and output ports appear at the 'bottom' face.
 *
 * NOTE: it is not necessary to render attached ports or boxes contained by this node, only the containing Node itself.
 *
 */
export default class FlowNode extends FlowBox{
    //TODO: maybe Box should be sub-component and not inherited from?
    /** The child type-name of the Node */
    nodeType;

    /** A list of input ports attached to the Node
     * @type {FlowInPort[]} */
    inPorts = [];
    /** A list of output ports attached to the Node
     * @type {FlowOutPort[]} */
    outPorts =[];

    //orientation='V';

    /**
     * A list of ports attached to the node
     * @return {FlowPort[]} */
    get ports(){ return [...this.inPorts,...this.outPorts]}
    constructor(nodeType,id=null) {
        super('node',id);
        this.nodeType=nodeType;
    }

    /** Attaches an input port to the node.
     * @param {FlowInPort} port*/
    attachInPort(port){
        this.inPorts.push(port);
        port.setParent(this);
    }
    /** Attaches an output port to the node
     * @param {FlowOutPort} port*/
    attachOutPort(port){
        this.outPorts.push(port);
        port.setParent(this);
    }

    /**
     * Creates and attaches a new input port to the node
     * @param type the child type-name to assign to the port
     * @param id the ID of the new port (or null to assign a random UUID)
     * @returns {FlowInPort} the created input port
     */
    addInPort(type,id=null){
        let port = new FlowInPort(type,id);
        this.attachInPort(port);
        return port;
    }
    /**
     * Creates and attaches a new output port to the node
     * @param type the child type-name to assign to the port
     * @param id the ID of the new port (or null to assign a random UUID)
     * @returns {FlowOutPort} the created output port
     */
    addOutPort(type,id=null){
        let port = new FlowOutPort(type,id);
        this.attachOutPort(port);
        return port;
    }


    renderElement($,options={}) {
        let left = +this.point?.x;
        let top = +this.point?.y;

        let $all = $([]);
        for(let port of this.ports){//render the port elements
            $all.add( port.render($) );//TODO: why are we doing this when the ports are rendered inside the CSS Grid - removing this doesn't seem to impact behavior.
        }

        let $grid =super.renderElement($); //create a CSS Grid container element using a 3x3 layout
        $grid.removeClass('flow-box').addClass('flow-node');//don't inherit the Box class.
        $grid.attr('style',`left:${left}px;top:${top}px`);
        $grid.attr('data-flow-node-type',this.nodeType);

        //create all of the side-panels ("faces") for the css grid
        //$grid = $(`<div class="flow-node" style="left:${left}px;top:${top}px">`);
        let $top= $('<div class="flow-node-ports flow-node-ports-h flow-node-ports-top">')
        this.inPorts.map(port=>port.render($)).forEach($el=>$top.append($el));//render each input port and add them to the Top face/panel.
        let $left= $('<div class="flow-node-ports flow-node-ports-v flow-node-ports-left">')
        let $right= $('<div class="flow-node-ports flow-node-ports-v flow-node-ports-right">')
        let $bottom= $('<div class="flow-node-ports flow-node-ports-h flow-node-ports-bottom">')
        this.outPorts.map(port=>port.render($)).forEach($el=>$bottom.append($el));//render each output port and add them to the Bottom face/panel.

        //add the faces areas to the CSS grid.
        $grid.append($top);
        $grid.append($left);
        $grid.append($right);
        $grid.append($bottom);

        //render the inner "box"/card element of the Node.
        let $box = super.renderElement($);
        $box.addClass("flow-node-box-center");
        $box.removeAttr('id');

        //add it to the CSS Grid (at the center)
        $grid.append($box);


        $all = $all.add($grid);
        //debugger;



        return $all;//TODO: why are we returning all elements instead of just the CSS Grid container?  changing this doesn't seem to impact behavior.
    }

}