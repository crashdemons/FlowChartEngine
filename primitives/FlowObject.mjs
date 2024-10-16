/**
 * A base object representing the basic properties of all flowchart objects.
 *
 * This contains a "base type" and an ID value for the object.
 * @abstract */
export default class FlowObject {
    /** The child type-name of the flowchart object (usually "drawable") */
    baseType;
    /** An ID value uniquely identifying the flowchart object.
     * @type {string} */
    id;

    /**
     * A marker field for future use, intended to indicate if the flowchart object is only needed for display/session purposes (true), or should be saved/serialized (false).
     * @type {boolean}
     */
    transient = false;

    /**
     * Construct a new flowchart object base object
     * @param {string} baseType the child type-name of the object you're creating
     * @param {string|null} id An ID value uniquely identifying the flowchart object.  If this is not provided, a random UUID will be assigned.
     */
    constructor(baseType, id = null) {
        this.baseType = baseType;
        this.id = id ?? crypto.randomUUID();
    }

    /**
     * Dispatch a flow event.
     *
     * The base method dispatches the event under 'document'.
     *
     * @param {FlowEvent} evt
     * @param {HTMLElement|EventTarget|null} target
     * */
    dispatchEvent(evt, target = null) {
        target = target ?? document;
        target.dispatchEvent(evt);
    }

    beforeRemove(){}

}