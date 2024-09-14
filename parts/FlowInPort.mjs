import FlowPort from "../primitives/FlowPort.mjs";

export default class FlowInPort extends FlowPort{
    inType;
    constructor(inType,id=null) {
        super('input',id);
        this.inType=inType;
    }

    renderElement($, options = {}) {
        let $el = super.renderElement($, options);
        $el.addClass("flow-port-in")
        return $el;
    }

}