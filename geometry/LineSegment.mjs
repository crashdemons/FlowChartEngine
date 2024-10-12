import Point from "./Point.mjs";
import TwoPoint from "./TwoPoint.mjs";

/**
 * A geometric object representing a line-segment between two points.
 *
 */
export default class LineSegment extends TwoPoint{
    /**
     * Construct a line segment from two endpoints
     * @param {Point} p1
     * @param {Point} p2
     */
    constructor(p1,p2) {
        super(p1,p2);
    }

    /**
     * Construct a line segment from the coordinates of two endpoints.
     * @param x1 X position of the first point
     * @param y1 Y position of the first point
     * @param x2 X position of the second point
     * @param y2 Y position of the second point
     * @returns {LineSegment}
     */
    static fromCoordinates(x1,y1,x2,y2){
        return new LineSegment(new Point(x1,y1),new Point(x2,y2));
    }


}