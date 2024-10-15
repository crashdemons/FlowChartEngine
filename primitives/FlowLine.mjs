import FlowDrawable from "./FlowDrawable.mjs";

/**
 * A flowchart object representing line segment which can be drawn to a {@link FlowCanvas}.
 * @abstract */
export default class FlowLine extends FlowDrawable {
    /**
     * A line segment holding the two endpoints of the Edge.
     * @type {TwoPoint} */
    lineSegment;

    /**
     * Construct a new flowchart edge.
     * @param edgeType the child type-name of the edge.
     * @param id an ID value.  If none is provided, a random UUID will be assigned.
     */
    constructor(edgeType, id = null) {
        super('segment', id);
    }

    render($, options = {thickness: 1, color: 'red'}) {
        return super.render($, options);
    }

    //dummy function - Edges are rendered to the canvas without a DOM representation at this time.
    renderElement($, options = {thickness: 1, color: 'red'}) {/*
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
        this.renderSpline(canvas);
    }

    /**
     * Draws a spline representation of the Edge onto a {@link FlowCanvas}
     * @param {FlowCanvas} canvas
     * @protected
     * */
    renderSpline(canvas) {
        var x1 = this.lineSegment.x1;
        var y1 = this.lineSegment.y1;
        // top right
        var x2 = this.lineSegment.x2;
        var y2 = this.lineSegment.y2;
        canvas.drawSpline(x1, y1, x2, y2)
    }

}