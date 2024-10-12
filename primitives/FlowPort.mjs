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