/**
 * A geometric object representing a 2-dimensional point
 */
export default class Point{
    /** A reference point for (0,0) or the "origin" on the coordinate plane.  This object should be cloned rather than mutated directly.*/
    static Zero = new Point(0,0);

    /** The X-position of the point
     * @type {Number} */
    x;
    /** The Y-position of the point
     * @type {Number} */
    y;

    /**
     * Constructs a new point object using the X and Y position in the plane
     * @param {Number} x
     * @param {Number} y
     */
    constructor(x,y) {
        this.x=x;
        this.y=y;
    }

    /**
     * Shifts a point by adding to the X and Y positions separately.
     *
     * This operation mutates the object and can be chained.
     * @param {Number} dx
     * @param {Number} dy
     */
    add(dx,dy){
        this.x+=dx;
        this.y+=dy;
    }
    /**
     * Shifts a point by subtracting from the X and Y positions separately.
     *
     * This operation mutates the object and can be chained.
     * @param {Number} dx
     * @param {Number} dy
     */
    subtract(dx,dy){
        this.x+=dx;
        this.y+=dy;
    }

    /**
     * Shifts a point by the X and Y values of the passed object.  The behavior used is the same as in {@link add}.
     *
     * This operation mutates the object and can be chained.
     * @param {Point|PointLike} offset
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
     * Shifts a point by the X and Y values of the passed object.  The behavior used is the same as in {@link subtract}.
     *
     * This operation mutates the object and can be chained.
     * @param {Point|PointLike} offset
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
     * Constructs a point from an object containing an X and Y value.
     *
     * @param {PointLike} obj
     * @returns {Point}
     */
    static fromPointlike(obj){
        return new Point(obj.x,obj.y);
    }

    /** Creates a new Point with equal X and Y values to the current */
    clone(){
        return  Point.fromPointlike(this);
    }

    /**
     * Scales the X and Y value of the point using passed factors (using multiplication)
     *
     * This operation mutates the object and can be chained.
     * @param {Number} fx The factor to scale the X value by (for example, 0.5 will half the X value of the point)
     * @param {Number|null} fy The factor to scale the X value by.  If this is not provided or null is used, the scaling factor for X will be used so that both scale in proportion.
     */
    multiply(fx,fy=null){
        if(fy===null) fy=fx;
        this.x*=fx;
        this.y*=fy;
        return this;
    }
    /**
     * Scales the X and Y value of the point using passed factors (using division)
     *
     * This operation mutates the object and can be chained.
     * @param {Number} fx The factor to scale the X value by (for example, 2 will half the X value of the point)
     * @param {Number|null} fy The factor to scale the X value by.  If this is not provided or null is used, the scaling factor for X will be used so that both scale in proportion.
     */
    divide(fx,fy=null){
        if(fy===null) fy=fx;
        this.multiply(1/fx,1/fy);
        return this;
    }
}

/**
 * An object supporting an 'x' and 'y' value as properties.
 * @typedef {Object} PointLike
 * @property {number} x
 * @property {number} y
 */