import Point from "./Point.mjs";
import TwoPoint from "./TwoPoint.mjs";

export default class LineSegment extends TwoPoint{
    /**
     *
     * @param {Point} p1
     * @param {Point} p2
     */
    constructor(p1,p2) {
        super(p1,p2);
    }
    static fromCoordinates(x1,y1,x2,y2){
        return new LineSegment(new Point(x1,y1),new Point(x2,y2));
    }


}