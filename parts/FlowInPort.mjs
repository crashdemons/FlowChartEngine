import FlowPort from "../primitives/FlowPort.mjs";

/** A {@link FlowPort} which is marked as a directional "input port" */
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