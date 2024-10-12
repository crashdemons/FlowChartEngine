/**
 * A geometric object representing the width and height of a 2-dimensional object or area.
 */
export default class Dimensions{
    /**
     * The width of the object
     * @type {Number}
     */
    width;
    /**
     * The height of the object
     * @type {Number}
     */
    height;

    /**
     * Construct the Dimensions object from a width and height
     * @param {Number} width
     * @param {Number} height
     */
    constructor(width,height) {
        this.width = width;
        this.height = height;
    }


    /**
     * Scales the Width and Height value of the Dimensions using passed factors (using multiplication)
     *
     * This operation mutates the object and can be chained.
     * @param {Number} fx The factor to scale the Width value by (for example, 0.5 will half the X value of the point)
     * @param {Number|null} fy The factor to scale the Height value by.  If this is not provided or null is used, the scaling factor for X will be used so that both scale in proportion.
     */
    multiply(fx,fy=null){
        if(fy===null) fy=fx;
        this.width*=fx;
        this.height*=fy;
    }

}