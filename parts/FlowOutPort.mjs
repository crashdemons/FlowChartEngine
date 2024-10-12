import FlowPort from "../primitives/FlowPort.mjs";
import FlowPortSingle from "../primitives/FlowPortSingle.mjs";

/** A {@link FlowPort} which is marked as an "output port" */
export default class FlowOutPort extends FlowPortSingle{
    outType;
    constructor(outType,id=null) {
        super('output',id);
        this.outType=outType;
    }
    renderElement($, options = {}) {
        let $el = super.renderElement($, options);
        $el.addClass("flow-port-out")
        return $el;
    }

}