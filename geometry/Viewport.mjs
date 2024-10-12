import Point from "./Point.mjs";
import Dimensions from "./Dimensions.mjs";

/**
 * A geometric object representing a viewport through which the coordinate plane is scaled and translated.
 *
 * This is the mathematical component used to convert coordinates inside a scaled/scrollable DOM element/container.
 *
 * NOTE: this is not related in any way to the DOM content of the "viewport" (the browser view).
 */
export default class Viewport{
    /** The outer (absolute) position of the container element
     * @type {Point} */
    outerPosition;
    /** The outer (absolute) dimensions of the container element
     * @type {Dimensions} */
    outerDimensions;
    /** The inner (scaled) dimensions of the container's content space.
     * @type {Dimensions} */
    innerDimensions;
    /** A point representing the scroll X and Y position of the container's content (scrollLeft,scrollTop are DOM equivalents).
     * @type {Point} */
    scroll;

    /** The scaling factors of the container's content relative to the outside.
     * @type {Dimensions} */
    scale;

    /**
     * Constructs a viewport object from information about a container element.
     * @param outerX The outer (absolute) position of the container element
     * @param outerY The outer (absolute) position of the container element
     * @param outerWidth The outer (absolute) dimensions of the container element
     * @param outerHeight The outer (absolute) dimensions of the container element
     * @param innerWidth The inner (scaled) dimensions of the container's content space.
     * @param innerHeight The inner (scaled) dimensions of the container's content space.
     * @param scrollX the scroll X position of the container's content (scrollLeft is DOM equivalent).
     * @param scrollY the scroll Y position of the container's content (scrollTop is DOM equivalent).
     */
    constructor(outerX,outerY,outerWidth,outerHeight,innerWidth,innerHeight,scrollX=0,scrollY=0) {
        this.outerPosition=new Point(outerX,outerY);
        this.outerDimensions=new Dimensions(outerWidth,outerHeight);
        this.innerDimensions=new Dimensions(innerWidth,innerHeight);
        this.scroll = new Point(scrollX,scrollY);
        this.scale=new Dimensions(innerWidth/outerWidth,innerHeight/outerHeight);
    }

    /**
     * Converts an outer (absolute) position point to an inner (scaled/scrolled) position.
     * @param {Point} outerPoint
     * @returns {Point}
     */
    pointOuterToInner(outerPoint){
        let innerPt=outerPoint.clone();
        innerPt.subtractOffset(this.outerPosition);
        //console.log(" sub",this.outerPosition,'->',innerPt)
        innerPt.multiply(this.scale.width,this.scale.height);
        innerPt.addOffset(this.scroll);
        return innerPt;
    }
    /**
     * Converts an inner (scaled/scrolled) position point to an outer (absolute) position.
     * @param {Point} innerPoint
     * @returns {Point}
     */
    pointInnerToOuter(innerPoint){
        let outerPt=innerPoint.clone();
        outerPt.subtractOffset(this.scroll);
        outerPt.divide(this.scale.width,this.scale.height);
        outerPt.addOffset(this.outerPosition);
        return outerPt;
    }

    /**
     * Constructs the viewport from a container DOM element
     * @param {HTMLElement} htmlElement
     */
    static fromElement(htmlElement){
        let rect = htmlElement.getBoundingClientRect();
        let el = htmlElement;
        return new Viewport(rect.x,rect.y,rect.width,rect.height,el.offsetWidth,el.offsetHeight,el.scrollLeft,el.scrollTop);
    }
}