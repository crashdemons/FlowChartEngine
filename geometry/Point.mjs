export default class Point{
    static Zero = new Point(0,0);

    /** @type {Number} */
    x;
    /** @type {Number} */
    y;

    /**
     *
     * @param {Number} x
     * @param {Number} y
     */
    constructor(x,y) {
        this.x=x;
        this.y=y;
    }

    add(x,y){
        this.x+=x;
        this.y+=y;
    }
    subtract(x,y){
        this.x+=x;
        this.y+=y;
    }

    /**
     *
     * @param {Point} offset
     * @returns {this}
     */
    addOffset(offset){
        //console.log("add offset",this.x,this.y,offset.x,offset.y);
        this.x+=offset.x;
        this.y+=offset.y;
        //console.log("add offset2",this.x,this.y);
        return this;
    }
    /**
     *
     * @param {Point} offset
     * @returns {this}
     */
    subtractOffset(offset){
        //console.log("sub offset",this.x,this.y,offset.x,offset.y);
        this.x-=offset.x;
        this.y-=offset.y;
        //console.log("sub offset2",this.x,this.y);
        return this;
    }

    /**
     * @param {PointLike} obj
     * @returns {Point}
     */
    static fromPointlike(obj){
        return new Point(obj.x,obj.y);
    }

    clone(){
        return  Point.fromPointlike(this);
    }

    multiply(fx,fy=null){
        if(fy===null) fy=fx;
        this.x*=fx;
        this.y*=fy;
        return this;
    }
    divide(fx,fy=null){
        if(fy===null) fy=fx;
        this.multiply(1/fx,1/fy);
        return this;
    }
}

/**
 * @typedef {Object} PointLike
 * @property {number} x
 * @property {number} y
 */