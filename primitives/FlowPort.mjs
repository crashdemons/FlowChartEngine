import FlowDrawable from "./FlowDrawable.mjs";
import Point from "../geometry/Point.mjs";
import FlowPortEvent from "../events/FlowPortEvent.mjs";

/**
 * A flowchart object representing a connection-point for an Edge/line-segment. The Port is generally attached directly to a Node/Box.
 *
 * This usually takes the form of a small circle.
 * @abstract
 */
export default class FlowPort extends FlowDrawable{
    /** The child type-name of the port*/
    portType;
    /** The parent Node that the port is attached to.
     * @type {FlowNode} */
    parent;
    /** The width of rendered ports - used in centering Edge connections */
    static Width=8;
    /** The height of rendered ports - used in centering Edge connections */
    static Height=8;

    /** An array tracking which edges are connected to this port
     * @type {FlowEdge[]} */
    edges=[];



    /** Track the edge as connected to this port.
     *
     * @deprecated this does not inform the Edge that a connection has been made. You should avoid using this method over the corresponding FlowConnection method.
     * @param {FlowEdge} edge */
    connectEdge(edge){
        let idx = this._findEdge(edge.id);
        if(idx!==-1) return;
        this.edges.push(edge);
        console.log("connect port to edge",this,edge);
    }


    /** Untrack all attached edges from this port.
     *
     * @deprecated this does not inform the Edge that a connection has been made. You should avoid using this method over the corresponding FlowConnection method.
     * */
    disconnectEdges(){
        this.edges=[];
    }
    /** @protected */
    _findEdge(id){
        for(let i=0;i<this.edges.length;i++) if(this.edges[i]?.id===id) return i;
        return -1;
    }
    /** Retrieve a connected FlowEdge with a matching ID value */
    findEdge(id){
        for(let edge of this.edges) if(edge?.id===id) return edge;
        return null;
    }
    /** Untrack the connected FlowEdge with a matching ID value
     *
     *
     * @deprecated this does not inform the Edge that a connection has been made. You should avoid using this method over the corresponding FlowConnection method.
     * */
    disconnectEdge(id){
        let idx = this._findEdge(id);
        if(idx===-1) return;
        this.edges.splice(idx, 1);
    }







    /** The center-point position of a port, relative to its corner.  This is generally the half-width and half-height */
    static get CenterOffset(){
        return new Point(
            FlowPort.Width/2,
            FlowPort.Height/2
        );
    }

    /** Construct a new flowchart Port
     *
     * @param portType the child type-name of the port
     * @param id an ID value. If none or null is provided, a random UUID will be assigned.
     */
    constructor(portType,id) {
        super('port',id);
        this.portType=portType;
    }

    /**
     * Sets the parent Node that the port is attached to.  This is not used in rendering, only for reference.
     * @param {FlowNode} parent
     * */
    setParent(parent){
        this.parent=parent;
    }

    renderElement($,options={}){
        let instanceId = (""+Math.random()).substring(2);
        let $elem = $(`<div class="flow-port" id="fo-${instanceId}">`);
        this.bindEvents($elem);
        return $elem;
    }

    /**
     * bind flowchart events to created elements.
     *
     * @protected
     * @param {JQuery} $elem jquery element
     */
    bindEvents($elem){
        let port = this;
        $elem.on('hover',()=>{
            $elem[0].dispatchEvent(new FlowPortEvent(port,'hover'));
        })
        $elem.on('click',()=>{
            this.fire('click');
            //let evt = new FlowPortEvent(port,'click');
            //console.log("Dispatchevent click",$elem[0],evt);
            //$elem[0].dispatchEvent(evt);
        })
    }

    /**
     * Listen for a FlowPort event
     * @param type
     * @param {function(FlowPortEvent)} listener
     */
    static on(type,listener){
        FlowPortEvent.on(type,listener);
    }

    /**
     * Forces the FlowPort to fire a FlowPortEvent of the specified type.
     *
     * If no target is specified, the last rendered element is used if available, otherwise 'document' is used.
     *
     * @param {string} type the flowport event name
     * @param options options to pass to CustomEvent
     * @param {HTMLElement|EventTarget|null} target the event target
     */
    fire(type,options={},target=null){
        let evt = new FlowPortEvent(this,'click',options);
        console.log("Dispatchevent",evt);
        this.dispatchEvent(evt,target);
    }

}