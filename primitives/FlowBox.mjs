import FlowObject from "./FlowObject.mjs";
import FlowDrawable from "./FlowDrawable.mjs";

/** @abstract */
export default class FlowBox extends FlowDrawable{
    boxType;
    /** @type {Point} */
    point;
    constructor(boxType,id=null) {
        super('box',id)
        this.boxType = boxType;
    }

    renderElement($,options={}){
        let left = +this.point?.x;
        let top = +this.point?.y;
        let $div = super.renderElement($);
        //$div.attr('style',`left:${left},top:${top}`);
        $div.addClass('flow-box');
        $div.attr('data-flow-box-type',this.boxType);
        return $div;
    }
}