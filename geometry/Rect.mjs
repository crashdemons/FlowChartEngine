import TwoPoint from "./TwoPoint.mjs";
import Point from "./Point.mjs";

/**
 * A geometric object representing a rectangle using two opposite corner points.
 */
export default class Rect extends TwoPoint {
    /**
     * Construct the rectangle from two opposite corner points.
     * @param {Point} p1
     * @param {Point} p2
     */
    constructor(p1, p2) {
        super(p1, p2);
    }

    /** Construct a two-point object from coordinates representing two points
     * @param {Number} x1 X position of the first point
     * @param {Number} y1 Y position of the first point
     * @param {Number} x2 X position of the second point
     * @param {Number} y2 Y position of the second point
     * @returns {Rect}
     * */
    static fromCoordinates(x1, y1, x2, y2) {
        return new Rect(new Point(x1, y1), new Point(x2, y2));
    }

    /**
     * Converts the corner positions of a DOM Rect object to this two-point rect format in a new object.
     * @param {DOMRect|DOMRectReadOnly} rect the DOM rectangle object
     * @returns {Rect}
     */
    static fromDOMRect(rect) {
        return Rect.fromCoordinates(rect.left, rect.top, rect.right, rect.bottom);
    }

    /**
     * Shifts the rectangle so that the first corner point is at the provided X and Y positions.
     *
     * The entire rectangle is shifted by the same amount to maintain relative width, height, and positioning to other points.
     * @param x1
     * @param y1
     */
    moveTo(x1, y1) {
        let dx = this.x2 - this.x1;
        let dy = this.y2 - this.y1;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x1 + dx;
        this.y2 = y1 + dy;
    }

    /** Calculates the distance between the two points of the object */
    distance() {
        return Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2));
    }

}