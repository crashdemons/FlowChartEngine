import Point from "./Point.mjs";
import Dimensions from "./Dimensions.mjs";


export default class Viewport{
    /** @type {Point} */
    outerPosition;
    /** @type {Dimensions} */
    outerDimensions;
    /** @type {Dimensions} */
    innerDimensions;
    /** @type {Point} */
    scroll;

    /** @type {Dimensions} */
    scale;
    constructor(outerX,outerY,outerWidth,outerHeight,innerWidth,innerHeight,scrollX=0,scrollY=0) {
        this.outerPosition=new Point(outerX,outerY);
        this.outerDimensions=new Dimensions(outerWidth,outerHeight);
        this.innerDimensions=new Dimensions(innerWidth,innerHeight);
        this.scroll = new Point(scrollX,scrollY);
        this.scale=new Dimensions(innerWidth/outerWidth,innerHeight/outerHeight);
    }
    pointOuterToInner(outerPoint){
        let innerPt=outerPoint.clone();
        innerPt.subtractOffset(this.outerPosition);
        //console.log(" sub",this.outerPosition,'->',innerPt)
        innerPt.multiply(this.scale.width,this.scale.height);
        innerPt.addOffset(this.scroll);
        return innerPt;
    }
    pointInnerToOuter(innerPoint){
        let outerPt=innerPoint.clone();
        outerPt.subtractOffset(this.scroll);
        outerPt.divide(this.scale.width,this.scale.height);
        outerPt.addOffset(this.outerPosition);
        return outerPt;
    }
}