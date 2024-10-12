import FlowDrawable from "./FlowDrawable.mjs";

/**
 * A flowchart object representing an "edge" or specific line segment which can be drawn to a {@link FlowCanvas}.
 * @abstract */
export default class FlowEdge extends FlowDrawable{
    /**
     * A line segment holding the two endpoints of the Edge.
     * @type {TwoPoint} */
    lineSegment;

    /**
     * Construct a new flowchart edge.
     * @param edgeType the child type-name of the edge.
     * @param id an ID value.  If none is provided, a random UUID will be assigned.
     */
    constructor(edgeType,id=null) {
        super('edge',id);
    }

    render($,options={thickness:1,color:'red'}){
        return super.render($,options);
    }

    //dummy function - Edges are rendered to the canvas without a DOM representation at this time.
    renderElement($,options={thickness:1,color:'red'}){/*
        // bottom right
        var x1 = this.lineSegment.x1;
        var y1 = this.lineSegment.y1;
        // top right
        var x2 = this.lineSegment.x2;
        var y2 = this.lineSegment.y2;
        // distance
        var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
        // center
        var cx = ((x1 + x2) / 2) - (length / 2);
        var cy = ((y1 + y2) / 2) - (options.thickness / 2);
        // angle
        var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);

        console.log("Edge",x1,y1,x2,y2,length,cx,cy,angle,options);
        // make hr
        return $("<div class='flow-edge' style='padding:0px; margin:0px; height:" + options.thickness + "px; background-color:" + options.color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; transform:rotate(" + angle + "deg);' />");
        */
        return $([]);
    }

    /** Draw the Edge onto a {@link FlowCanvas} */
    drawCanvas(canvas) {
        this.renderSpline2(canvas.element,canvas.ctx);
    }

    /**
     * Draws a spline representation of the Edge onto a {@link FlowCanvas}
     * @param {FlowCanvas} canvas
     * @protected
     * */
    renderSpline(canvas){
        this.renderSpline2(canvas.element,canvas.ctx);
    }

    /**
     * Draws a spline representation of the Edge onto an HTML canvas using a provided rendering context.
     * @param {HTMLCanvasElement} canvas
     * @param {CanvasRenderingContext2D} ctx
     * @protected
     * */
    renderSpline2(canvas,ctx){
        // bottom right

        var x1 = this.lineSegment.x1;
        var y1 = this.lineSegment.y1;
        // top right
        var x2 = this.lineSegment.x2;
        var y2 = this.lineSegment.y2;
        FlowEdge.drawSpline(canvas,ctx,x1,y1,x2,y2);
    }

    /**
     * Draws a spline onto an HTML canvas using a provided rendering context, with the provided endpoints.
     * @param {HTMLCanvasElement} canvas
     * @param {CanvasRenderingContext2D} ctx
     * @param x1 X position of the first endpoint
     * @param y1 Y position of the first endpoint
     * @param x2 X position of the second endpoint
     * @param y2 Y position of the second endpoint
     * @protected
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