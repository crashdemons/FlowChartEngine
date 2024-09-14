import Point from "./Point.mjs";

export default class TwoPoint{
    /** @type {Point} */
    p1;
    /** @type {Point} */
    p2;

    get points(){ return [this.p1,this.p2]; }
    get x1(){ return this.p1.x; }
    get y1(){ return this.p1.y; }
    get x2(){ return this.p2.x; }
    get y2(){ return this.p2.y; }

    /**
     *
     * @param {Point} p1
     * @param {Point} p2
     */
    constructor(p1,p2) {
        this.p1=p1;
        this.p2=p2;
    }

    static fromCoordinates(x1,y1,x2,y2){
        return new TwoPoint(new Point(x1,y1),new Point(x2,y2));
    }
}