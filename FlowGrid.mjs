import FlowDrawable from "./primitives/FlowDrawable.mjs";
import FlowNode from "./parts/FlowNode.mjs";
import Point from "./geometry/Point.mjs";
import FlowConnection from "./parts/FlowConnection.mjs";
import Rect from "./geometry/Rect.mjs";
import Dimensions from "./geometry/Dimensions.mjs";
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
        return undefined;
    }
    updateCanvas(){
        let CCBR = this.getContainerOuterDims();
        let scale = this.containerScale.width;
        CCBR.width/=scale;
        CCBR.height/=scale;

        this.canvas.style.width=CCBR.width+"px";
        this.canvas.style.width=CCBR.width+"px";
        this.canvas.style.height=CCBR.height+"px";
        this.canvas.width=CCBR.width;
        this.canvas.height=CCBR.height;
    }

    getChildInnerPos(el){
        console.log("GCP",el);
        return this.#getElementInnerPos(el);
    }
    get containerOuterPos(){
        let cbcr = this.containerOuterRect;
        //console.debug("ABCR",cbcr);
        let coff=Rect.fromDOMRect(cbcr).p1;
        return coff;
    }
    get viewport(){
        let rect = this.containerOuterRect;
        let el = this.$container[0];
        return new Viewport(rect.x,rect.y,rect.width,rect.height,el.offsetWidth,el.offsetHeight,el.scrollLeft,el.scrollTop);
        //return new Viewport()
    }


    get containerInnerScroll(){
        return new Point(this.$container[0].scrollLeft,this.$container[0].scrollTop)
    }

    get containerOuterRect(){
        return this.$container[0].getBoundingClientRect();
    }
    getContainerOuterDims(){
        let rect = this.containerOuterRect;
        return new Dimensions(rect.width,rect.height);
    }
    get containerScale(){
        let rect = this.containerOuterRect;
        return new Dimensions(rect.width/this.$container[0].offsetWidth , rect.height/this.$container[0].offsetHeight);
    }

    /**
     * @param {JQuery<HTMLElement>|HTMLElement|null} el
     * @returns {Point|null}
     */
    #getElementOuterPos(el) {
        if(!el)  return null;
        if(!(el instanceof HTMLElement)) el = el[0];//resolve jQuery to HTMLElement
        let bcr = el.getBoundingClientRect();
        console.debug("BCR",el,bcr.left,bcr.top,el.offsetLeft,el.offsetTop);
        let pt = Rect.fromDOMRect(bcr).p1;
        console.debug("getElementPos",el,pt.x,pt.y);
        return pt;
    }
    #getElementInnerPos(el){
        if(!el) return null;
        let outerPt = this.#getElementOuterPos(el);
        console.log("GEIP",el,outerPt);
        let innerPt = this.viewport.pointOuterToInner(outerPt);
        return innerPt;
        /*
        //return FlowConnection.#getElementPos(el);
        if(!container || !el) return null;
        if(!(container instanceof HTMLElement)) container = container[0];//resolve jQuery to HTMLElement
        let containerRect = container.getBoundingClientRect();

        console.debug("ABCR",container,containerRect,container.offsetWidth,container.offsetHeight);


        let containerPos=Rect.fromDOMRect(containerRect).p1;
        let elementPos = FlowGrid.#getElementPos(el);
        elementPos.subtractOffset(containerPos)
        //elementPos.add(container.scrollLeft,container.scrollTop);


        console.debug("getRelativeElementPos",el,elementPos);
        return elementPos;
        */
    }
}