import FlowDrawable from "./primitives/FlowDrawable.mjs";
import Point from "./geometry/Point.mjs";
import Rect from "./geometry/Rect.mjs";
import Viewport from "./geometry/Viewport.mjs";
import FlowCanvas from "./FlowCanvas.mjs";

/**
 * An object representing the drawable area of a flowchart, corresponding to a container element.
 */
export default class FlowGrid extends FlowDrawable {
    /**
     * A reference to the global Window object.
     * @type {Window} */
    window;
    /** A reference to the global jQuery object
     * @type {any | jQuery | HTMLElement | (function(any, any): jQuery.init)} */
    jQuery;
    /** The jQuery element of the flowchart container
     * @type {JQuery} */
    $container;
    /** The Canvas object used for background drawings.
     * @type {FlowCanvas} */
    canvas;
    /** An object tracking the current mouse position in the grid
     * @type {Point} */
    mousePt = Point.Zero.clone();

    /**
     * Create a new flowchart area.
     * @param {Window} window A reference to the global Window object.
     * @param {any | jQuery | HTMLElement | (function(any, any): jQuery.init)} jQuery  A reference to the global jQuery object
     * @param {JQuery} $containerElem A jQuery element for the container to display the flowchart in.
     */
    constructor(window, jQuery, $containerElem) {
        super();
        this.window = window;
        this.jQuery = jQuery;
        this.attachToContainer($containerElem);
        window.addEventListener('mousemove', (e) => {
            let ptOuter = new Point(e.clientX, e.clientY);
            let ptInner = this.viewport.pointOuterToInner(ptOuter);
            //pt.subtractOffset(this.containerPos)
            //pt.addOffset(this.containerScroll);
            this.mousePt = ptInner;
            //console.log("mouse",pt);
        })
    }

    /**
     * Gets the viewport represented by the flowchart container element
     * @returns {Viewport}
     */
    get viewport() {
        return Viewport.fromElement(this.$container[0]);
    }

    /**
     * Adds an element to the flowchart
     * @param {JQuery|HTMLElement} elem
     */
    appendDrawableElement(elem) {
        this.$container.append(elem);
    }

    /**
     * Clears all elements from the flowchart.
     */
    clearDrawables() {
        this.$container.children().not(".flow-grid-noclear").remove();
    }

    /**
     * Attaches this grid to a container element, making the necessary modifications and child elements.
     * @param {JQuery} $containerElem A jQuery element for the container to display the flowchart in.
     */
    attachToContainer($containerElem) {
        this.$container = $containerElem;
        console.log("attachToContainer", $containerElem, this.$container)
        this.$container.html("");
        this.$container.addClass('flow-grid');
        this.canvas = FlowCanvas.createInContainer(this.jQuery, $containerElem);
    }

    renderElement($, options) {
        return this.$container;
    }

    /**
     * Gets the outer (document-absolute) position of an element that exists within the flowchart.
     * @param {JQuery<HTMLElement>|HTMLElement|null} el the child element
     * @returns {Point|null} The position, or null if the element is null.
     */
    getChildOuterPos(el) {
        if (!el) return null;
        if (!(el instanceof HTMLElement)) el = el[0];//resolve jQuery to HTMLElement
        let bcr = el.getBoundingClientRect(); //the BCR is as close to an document-absolute position as you can get.
        ///console.debug("BCR",el,bcr.left,bcr.top,el.offsetLeft,el.offsetTop);
        let pt = Rect.fromDOMRect(bcr).p1;//retrieve left,top as a point.
        //console.debug("getElementPos",el,pt.x,pt.y);
        return pt;
    }

    /**
     * Gets the inner (scaled/scrolled) position of an element that exists within the flowchart.
     * @param {JQuery<HTMLElement>|HTMLElement|null} el the child element
     * @returns {Point|null} The position, or null if the element is null.
     */
    getChildInnerPos(el) {
        if (!el) return null;
        let outerPt = this.getChildOuterPos(el);  //we can't really trust style position or other methods to be correct without work, so get the BoundingClientRect as an outer position
        ///console.debug("GEIP",el,outerPt);
        return this.viewport.pointOuterToInner(outerPt); //convert the outer position to inner using scaling/scrolling.
    }
}