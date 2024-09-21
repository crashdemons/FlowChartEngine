import FlowDrawable from "./primitives/FlowDrawable.mjs";


export default class FlowCanvas extends FlowDrawable{
    jQuery;
    /** @type {JQuery} */
    $element;
    /** @type {HTMLCanvasElement} */
    element;
    /** @type {CanvasRenderingContext2D} */
    ctx;

    constructor(jQuery, $canvas,id=null) {
        super('canvas',id);
        this.jQuery=jQuery;
        this.$element=$canvas;
        this.element=$canvas[0];
        this.ctx=this.element.getContext('2d');
    }

    /** @param {Viewport} viewport*/
    fillViewport(viewport){
        let innerDims = viewport.innerDimensions;
        this.element.style.width=innerDims.width+"px";
        this.element.style.width=innerDims.width+"px";
        this.element.style.height=innerDims.height+"px";
        this.element.width=innerDims.width;
        this.element.height=innerDims.height;
    }

    /**
     * @param {jQuery} jQuery
     * @param {JQuery} $container
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
}