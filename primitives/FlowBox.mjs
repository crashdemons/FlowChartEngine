import FlowDrawable from "./FlowDrawable.mjs";

/**
 * A flowchart object representing the inner visual box or "card" of a node.  It is not positioned as it is intended to be contained within a {@link FlowNode}
 */
export default class FlowBox extends FlowDrawable {
    /** The child type-name of the box object */
    boxType;
    /** A point the box should be rendered at. (UNUSED)
     *  @type {Point}  */
    point;

    constructor(boxType, id = null) {
        super('box', id)
        this.boxType = boxType;
    }

    renderElement($, options = {}) {
        let left = +this.point?.x;
        let top = +this.point?.y;
        let $div = super.renderElement($);
        //$div.attr('style',`left:${left},top:${top}`);
        $div.addClass('flow-box');
        $div.attr('data-flow-box-type', this.boxType);
        return $div;
    }
}