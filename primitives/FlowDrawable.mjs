import FlowObject from "./FlowObject.mjs";


export default class FlowDrawable extends FlowObject{
    drawType;
    /** @type {jQuery|null} */
    $element = null;
    elementTag = 'div'
    constructor(drawType,id) {
        super('drawable',id)
        this.drawType=drawType;
    }

    /**
     * @param {$: jQuery | HTMLElement | (function(any, any): any) | any} $
     * @param {object} options
     * @final
     */
    render($,options={}){
        return this.$element = this.renderElement($,options);
    }

    /**
     * @param {jQuery} $
     * @param {object} options
     * @return {JQuery}
     * @abstract */
    renderElement($,options={}){
        let $div = $(`<${this.elementTag}>`)
        $div.addClass('flow-drawable')
        $div.attr('id','fo-'+this.id);
        $div.attr('data-flow-id',this.id)
        $div.attr('data-flow-base-type',this.baseType)
        return $div;
    }

}