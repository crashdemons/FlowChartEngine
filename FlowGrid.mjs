import FlowDrawable from "./primitives/FlowDrawable.mjs";
import FlowNode from "./parts/FlowNode.mjs";
import Point from "./geometry/Point.mjs";
import FlowConnection from "./parts/FlowConnection.mjs";
import Rect from "./geometry/Rect.mjs";
import Viewport from "./geometry/Viewport.js";
import FlowCanvas from "./FlowCanvas.js";

export default class FlowGrid extends FlowDrawable{
    /** @type {Window} */
    window;
    /** @type {any | jQuery | HTMLElement | (function(any, any): jQuery.init)} */
    jQuery;
    /** @type {JQuery} */
    $container;
    /** @type {FlowCanvas} */
    canvas;
    /** @type {Point} */
    mousePt= Point.Zero.clone();
    /**
     * @param {Window} window
     * @param {jQuery} jQuery
     * @param {JQuery} $containerElem
     */
    constructor(window,jQuery,$containerElem) {
        super();
        this.window=window;
        this.jQuery=jQuery;
        this.attachToContainer($containerElem);
        window.addEventListener('mousemove',(e)=>{
            let ptOuter = new Point(e.clientX,e.clientY);
            let ptInner = this.viewport.pointOuterToInner(ptOuter);
            //pt.subtractOffset(this.containerPos)
           //pt.addOffset(this.containerScroll);
            this.mousePt=ptInner;
            //console.log("mouse",pt);
        })
    }



    /**
     * @param {JQuery} $containerElem
     */
    attachToContainer($containerElem){
        this.$container=$containerElem;
        console.log("attachToContainer",$containerElem,this.$container)
        this.$container.html("");
        this.$container.addClass('flow-grid');
        this.canvas = FlowCanvas.createInContainer(this.jQuery,$containerElem);
    }


    renderElement($, options) {
        return this.$container;
    }

    get viewport(){
        return Viewport.fromElement(this.$container[0]);
    }
    /**
     * @param {JQuery<HTMLElement>|HTMLElement|null} el
     * @returns {Point|null}
     */
    getChildOuterPos(el) {
        if(!el)  return null;
        if(!(el instanceof HTMLElement)) el = el[0];//resolve jQuery to HTMLElement
        let bcr = el.getBoundingClientRect();
        console.debug("BCR",el,bcr.left,bcr.top,el.offsetLeft,el.offsetTop);
        let pt = Rect.fromDOMRect(bcr).p1;
        console.debug("getElementPos",el,pt.x,pt.y);
        return pt;
    }
    getChildInnerPos(el){
        if(!el) return null;
        let outerPt = this.getChildOuterPos(el);
        console.log("GEIP",el,outerPt);
        return this.viewport.pointOuterToInner(outerPt);
    }
}