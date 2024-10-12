import FlowDrawable from "./primitives/FlowDrawable.mjs";

/**
 * An object wrapping an HTML canvas and providing useful drawing functions for a flowchart background.
 */
export default class FlowCanvas extends FlowDrawable{
    /**
     * Reference to the global jQuery object
     * @type {jQuery | HTMLElement | (function(any, any): any) | any}
     */
    jQuery;
    /** The jQuery element of the canvas.
     * @type {JQuery} */
    $element;
    /** The HTML DOM element of the canvas
     * @type {HTMLCanvasElement} */
    element;
    /** The 2D Rendering Context for the canvas
     * @type {CanvasRenderingContext2D} */
    ctx;

    /**
     * Create a new FlowCanvas
     * @param {jQuery | HTMLElement | (function(any, any): any) | any} jQuery Reference to the global jQuery object
     * @param {JQuery} $canvas The jQuery element of the canvas.
     * @param {string|null} id The ID of the Flow object. Assigned a random UUID if not provided
     */
    constructor(jQuery, $canvas,id=null) {
        super('canvas',id);
        this.jQuery=jQuery;
        this.$element=$canvas;
        this.element=$canvas[0];
        this.ctx=this.element.getContext('2d');
    }

    /**
     * Resize the Canvas to match the dimensions of the viewport/container element.
     * @param {Viewport} viewport a viewport of the flowchart container element. See {@link FlowGrid}
     * */
    fillViewport(viewport){
        let innerDims = viewport.innerDimensions;
        this.element.style.width=innerDims.width+"px";
        this.element.style.width=innerDims.width+"px";
        this.element.style.height=innerDims.height+"px";
        this.element.width=innerDims.width;
        this.element.height=innerDims.height;
    }

    /**
     * Create a new FlowCanvas inside an existing flowchart container element.
     *
     * This method must be used prior to adding other children to the container.
     * When the canvas is added, a second element will be added to fix relative positioning for elements added to the container afterward.
     * @param {jQuery | HTMLElement | (function(any, any): any) | any} jQuery Reference to the global jQuery object
     * @param {JQuery} $container the container element the flowchart is being created in.
     */
    static createInContainer(jQuery,$container){
        let $ = jQuery;
        let $canvasFix = $('<div class="flow-canvas-position-fix">');
        let $canvas = $('<canvas class="flow-canvas">');
        $canvasFix.append($canvas);
        $container.append($canvasFix);
        return new FlowCanvas(jQuery,$canvas);
    }

    renderElement($, options) {
        return this.$element;
    }

    /**
     * Draws a series of grid lines onto the canvas, using the current element width and height.
     */
    drawGridlines(){
        let canvas=this.element;
        let ctx = this.ctx;
        let wDivision = 32;
        let hDivision = wDivision;
        ctx.strokeStyle="#1f1f1f";
        for(let x=0;x<canvas.width;x+=wDivision){
            if(x%128===0){
                ctx.strokeStyle="#0f0f0f";
            }else{
                ctx.strokeStyle="#1f1f1f";
            }
            ctx.beginPath();
            ctx.moveTo(x,0)
            ctx.lineTo(x,canvas.height);
            ctx.stroke();
        }
        for(let y=0;y<canvas.height;y+=hDivision){
            if(y%128===0){
                ctx.strokeStyle="#0f0f0f";
            }else{
                ctx.strokeStyle="#1f1f1f";
            }
            ctx.beginPath();
            ctx.moveTo(0,y)
            ctx.lineTo(canvas.width,y);
            ctx.stroke();
        }
    }


    /**
     * Draws a spline onto an HTML canvas using a provided rendering context, with the provided endpoints.
     * @param x1 X position of the first endpoint
     * @param y1 Y position of the first endpoint
     * @param x2 X position of the second endpoint
     * @param y2 Y position of the second endpoint
     */
    drawSpline(x1,y1,x2,y2){
        FlowCanvas.drawSpline(this.element,this.ctx,x1,y1,x2,y2);
    }

    /**
     * Draws a spline onto an HTML canvas using a provided rendering context, with the provided endpoints.
     * @param {HTMLCanvasElement} canvas
     * @param {CanvasRenderingContext2D} ctx
     * @param x1 X position of the first endpoint
     * @param y1 Y position of the first endpoint
     * @param x2 X position of the second endpoint
     * @param y2 Y position of the second endpoint
     */
    static drawSpline(canvas,ctx,x1,y1,x2,y2){//TODO: can this be part of FlowCanvas?
        console.log("drawSpline:",x1,y1,x2,y2);
        //let $canvas = $('canvas');
        //let canvas = $canvas[0];
        //let ctx = canvas.getContext('2d');
        let w = canvas.width
        let h = canvas.height;
        let controlPointPull = (y2-y1)*0.5;

        let mx=(x1+x2)/2;
        let my=(y1+y2)/2;

        var grad= ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, "#ff3f3f");
        grad.addColorStop(0.15, "red");
        grad.addColorStop(0.5, "green");
        grad.addColorStop(1, "lime");

        ctx.strokeStyle = grad;
        ctx.lineWidth=4;
        ctx.lineCap="round";
        ctx.shadowColor = "#0000007f";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur=5;


        console.log("Canvas",canvas.width,canvas.height);
        console.log("Spline:",x1,y1,"->",mx,my,"->",x2,y2);

        let cx1=x1;
        let cy1=y1+controlPointPull;
        let cx2=x2;
        let cy2=y2-controlPointPull;

        //ctx.strokeStyle="green";
        ctx.fillRect(cx1,cy1,1,1);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        //ctx.lineTo(mx,my)
        ctx.quadraticCurveTo(cx1,cy1,mx,my);
        ctx.stroke();
        ctx.beginPath();

        //ctx.strokeStyle="red";
        ctx.fillRect(cx2,cy2,1,1);
        ctx.moveTo(x2,y2);
        //ctx.lineTo(mx,my);
        ctx.quadraticCurveTo(cx2,cy2,mx,my);
        ctx.stroke();
    }
}