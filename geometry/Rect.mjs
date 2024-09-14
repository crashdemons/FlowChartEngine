import TwoPoint from "./TwoPoint.mjs";
import Point from "./Point.mjs";

export default class Rect extends TwoPoint{
    /**
     *
     * @param {Point} p1
     * @param {Point} p2
     */
    constructor(p1,p2) {
        super(p1,p2);
    }

    static fromCoordinates(x1,y1,x2,y2){
        return new Rect(new Point(x1,y1),new Point(x2,y2));
    }

    moveTo(x1,y1){
        let dx = this.x2 - this.x1;
        let dy = this.y2 - this.y1;
        this.x1=x1;
        this.y1=y1;
        this.x2 = x1 + dx;
        this.y2 = y1 + dy;
    }


    distance(){
        return Math.sqrt( Math.pow(this.x2 - this.x1,2) + Math.pow(this.y2 - this.y1,2) );
    }

    /**
     *
     * @param {DOMRect} rect
     * @returns {TwoPoint}
     */
    static fromDOMRect(rect){
        return Rect.fromCoordinates(rect.left,rect.top,rect.right,rect.bottom);
    }

}