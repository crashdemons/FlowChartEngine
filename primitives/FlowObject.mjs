/** @abstract */
export default class FlowObject{
    baseType;
    /** @type {string} */
    id;
    transient = false;
    constructor(baseType,id=null) {
        this.baseType=baseType;
        this.id = id ?? crypto.randomUUID();
    }

}