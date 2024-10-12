import FlowObject from "./FlowObject.mjs";

/**
 * A flowchart object that can be drawn (either as an HTML element or using an HTML Canvas)
 */
export default class FlowDrawable extends FlowObject {
    /** The child type-name of the drawable object */
    drawType;
    /** a previously rendered jQuery element representing the object, if any.
     * @type {JQuery|null} */
    $element = null;
    /** The HTML Tag Name of the element to render with this class' base methods.*/
    elementTag = 'div'

    /**
     * Construct a drawable flowchart object
     * @param drawType the child type of the drawable (to be stored as 'drawType')
     * @param id an ID value to assign to the object.
     */
    constructor(drawType, id) {
        super('drawable', id)
        this.drawType = drawType;
    }

    /**
     * Render and store a fresh jQuery element representing the object.
     *
     * The stored element will be accessible in {@link $element}.
     *
     * This method should not be overridden.
     * @param {$: jQuery | HTMLElement | (function(any, any): any) | any} $ a reference to the jQuery global object
     * @param {object} options any options to pass to the {@link renderElement} method of the drawable.
     * @returns {JQuery} the rendered jQuery element representing the object.
     * @final
     */
    render($, options = {}) {
        return this.$element = this.renderElement($, options);
    }

    /**
     * Internal method for rendering a fresh jQuery element representing the object.
     *
     * This method should be overridden for type-specific behavior.
     *
     * The base class method provides a basic container object of the tag type specified by {@link elementTag}, with useful ID and type attributes.
     * The element will have a class of 'flow-drawable' and have the properties: 'id', 'data-flow-id', and 'data-flow-base-type'
     *
     * @param {jQuery} $ a reference to the jQuery global object
     * @param {object} options any options to use when rendering the object
     * @return {JQuery} the rendered jQuery element representing the object.
     * @protected
     * @abstract */
    renderElement($, options = {}) {
        let $div = $(`<${this.elementTag}>`)
        $div.addClass('flow-drawable')
        $div.attr('id', 'fo-' + this.id);
        $div.attr('data-flow-id', this.id)
        $div.attr('data-flow-base-type', this.baseType)
        return $div;
    }

    /** Update the positions of the object within the {@link FlowGrid}. Generally this is only used by objects that are linked to the positions of other elements or the mouse.
     *
     * For other objects, this does nothing.
     * @param {FlowGrid} grid*/
    updatePosition(grid) {
    }


    /** Draw the object to the {@link FlowCanvas}, if appropriate for this object. For objects that aren't canvas-drawn, this does nothing.
     * @param {FlowCanvas} canvas
     */
    drawCanvas(canvas) {
    }


    /**
     * Dispatch a flow event.
     *
     * The drawable method dispatches the event under the previously rendered element if it exists, otherwise it is dispatched under 'document'
     *
     * @param {FlowEvent} evt
     * @param {HTMLElement|EventTarget|null} target
     * */
    dispatchEvent(evt, target = null) {
        let elem = this.$element ? this.$element[0] : null;
        super.dispatchEvent(evt, elem);
    }

}