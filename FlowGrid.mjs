import FlowDrawable from "./primitives/FlowDrawable.mjs";
import FlowNode from "./parts/FlowNode.mjs";
import Point from "./geometry/Point.mjs";
import FlowConnection from "./parts/FlowConnection.mjs";
import Rect from "./geometry/Rect.mjs";
import Viewport from "./geometry/Viewport.js";

export default class FlowGrid extends FlowDrawable{
    /** @type {Window} */
    window;
    /** @type {any | jQuery | HTMLElement | (function(any, any): jQuery.init)} */
    jQuery;
    /** @type {JQuery} */
    $container;
    $canvas;
    canvas;
    ctx;
    /** @type {Point} */
    mousePt= Point.Zero.clone();
    /**
     * @param {Window} window
     * @param {jQuery} jQuery
     * @param {JQuery} $containerElem
     */
    constructor(window,jQuery,$containerElem) {
        super();
        this.window=window;
        this.jQuery=jQuery;
        this.attachToContainer($containerElem);
        window.addEventListener('mousemove',(e)=>{
            let ptOuter = new Point(e.clientX,e.clientY);
            let ptInner = this.viewport.pointOuterToInner(ptOuter);
            //pt.subtractOffset(this.containerPos)
           //pt.addOffset(this.containerScroll);
            this.mousePt=ptInner;

            //console.log("mouse",pt);
        })
    }



    prepareTestScene(){
        let $ = this.jQuery;
        let canvas=this.canvas;
        let ctx = this.ctx;

        let n = new FlowNode('test');
        n.point = new Point(0,0);
        n.addInPort('test');
        n.addInPort('test');
        let pout = n.addOutPort('test');
        let html2 = n.render($);

        n = new FlowNode('test');
        n.point = new Point(200,200);
        let pin= n.addInPort('test');
        n.addInPort('test');
        n.addOutPort('test');
        let html3 = n.render($);






        this.$container.append($(html2));
        this.$container.append($(html3));


        this.testConnection = new FlowConnection('test');
        this.testConnection.outPort = pout;
        this.testConnection.inPort = pin;

        this.testConnection2 = new FlowConnection('test');
        this.testConnection2.outPort = pout;
        this.testConnection2.inPort = null;
        //let html4 = x.render($,{thickness: 1,color:"#3f3fffaf"});
        //console.log(html4)
        //$('body').append($(html4));
        //ctx.imageSmoothingEnabled =
        //   ctx.mozImageSmoothingEnabled = ctx.webkitImageSmoothingEnabled = false;

        //x.renderSpline(canvas,ctx);

        //this.drawSpline(0,0,200,2000);

    }
    updateTestScene(){
        this.updateCanvas();
        this.testConnection.updatePosition(this);
        this.testConnection2.updatePosition(this);

    }
    drawTestScene(){
        this.drawGridlines();
        this.testConnection.renderSpline(this.canvas,this.ctx);
        this.testConnection2.renderSpline(this.canvas,this.ctx);
    }


    drawGridlines(){
        let canvas=this.canvas;
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
     * @param {JQuery} $containerElem
     */
    attachToContainer($containerElem){
        this.$container=jQuery($containerElem);
        console.log("attachToContainer",$containerElem,this.$container)
        this.$container.html("");
        this.$container.addClass('flow-grid');
        this.#addCanvas();
    }

    #addCanvas() {
        let $ = this.jQuery;
        let $canvasFix = $('<div class="flow-canvas-position-fix">');
        let $canvas = $('<canvas class="flow-canvas">');

        $canvasFix.append($canvas);

        this.$container.append($canvasFix);

        this.$canvas=$canvas;
        this.canvas=$canvas[0];
        this.ctx = this.canvas.getContext('2d');
    }

    renderElement($, options) {
        return this.$container;
    }
    updateCanvas(){
        let innerDims = this.viewport.innerDimensions;
        this.canvas.style.width=innerDims.width+"px";
        this.canvas.style.width=innerDims.width+"px";
        this.canvas.style.height=innerDims.height+"px";
        this.canvas.width=innerDims.width;
        this.canvas.height=innerDims.height;
    }

    get viewport(){
        return Viewport.fromElement(this.$container[0]);
    }
    /**
     * @param {JQuery<HTMLElement>|HTMLElement|null} el
     * @returns {Point|null}
     */
    getChildOuterPos(el) {
        if(!el)  return null;
        if(!(el instanceof HTMLElement)) el = el[0];//resolve jQuery to HTMLElement
        let bcr = el.getBoundingClientRect();
        console.debug("BCR",el,bcr.left,bcr.top,el.offsetLeft,el.offsetTop);
        let pt = Rect.fromDOMRect(bcr).p1;
        console.debug("getElementPos",el,pt.x,pt.y);
        return pt;
    }
    getChildInnerPos(el){
        if(!el) return null;
        let outerPt = this.getChildOuterPos(el);
        console.log("GEIP",el,outerPt);
        return this.viewport.pointOuterToInner(outerPt);
    }
}