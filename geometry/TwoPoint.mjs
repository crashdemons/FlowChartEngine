import Point from "./Point.mjs";

/**
 * Abstraction for geometric objects that use two points (like line segments and rects)
 */
export default class TwoPoint{
    /** The first point of the object
     * @type {Point} */
    p1;
    /** The second point of the object
     * @type {Point} */
    p2;

    /**
     * Retrieve the points of the object as an array
     * @returns {Point[]}
     */
    get points(){ return [this.p1,this.p2]; }
    /** Get the X position of the first point */
    get x1(){ return this.p1.x; }
    /** Get the Y position of the first point */
    get y1(){ return this.p1.y; }
    /** Get the X position of the second point */
    get x2(){ return this.p2.x; }
    /** Get the Y position of the second point */
    get y2(){ return this.p2.y; }

    /**
     * Construuct a new two-point object.
     * @param {Point} p1
     * @param {Point} p2
     */
    constructor(p1,p2) {
        this.p1=p1;
        this.p2=p2;
    }

    /** Construct a two-point object from coordinates representing two points
     * @param x1 X position of the first point
     * @param y1 Y position of the first point
     * @param x2 X position of the second point
     * @param y2 Y position of the second point
     * */
    static fromCoordinates(x1,y1,x2,y2){
        return new TwoPoint(new Point(x1,y1),new Point(x2,y2));
    }
}