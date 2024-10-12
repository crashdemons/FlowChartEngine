import FlowPort from "../primitives/FlowPort.mjs";
import FlowPortSingle from "../primitives/FlowPortSingle.mjs";

/** A {@link FlowPort} which is marked as an "input port" */
export default class FlowInPort extends FlowPortSingle{
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