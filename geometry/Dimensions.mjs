export default class Dimensions{
    width;height;

    constructor(width,height) {
        this.width = width;
        this.height = height;
    }


    multiply(fx,fy=null){
        if(fy===null) fy=fx;
        this.width*=fx;
        this.height*=fy;
    }

}