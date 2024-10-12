import FlowEvent from "./FlowEvent.mjs";

/** An event relating to a {@link FlowPort} */
export default class FlowPortEvent extends FlowEvent {
    static PREFIX = "port";
    static PREFIX_FULL = FlowEvent.PREFIX + ":" + FlowPortEvent.PREFIX;
    flowPortEventType;
    /** @type {FlowPort} */
    port;

    /**
     *
     * @param {FlowPort} port
     * @param type
     * @param options
     */
    constructor(port, type, options = {}) {
        super(FlowPortEvent.getFlowEventName(type), options);
        this.port = port;
    }


    /** Get the event name used with FlowEvent */
    static getFlowEventName(type) {
        return FlowPortEvent.PREFIX + ":" + type;
    }

    /** Get the full custom event name used with CustomEvent and addEventListener */
    static getEventName(type) {
        return FlowPortEvent.PREFIX_FULL + ":" + type;
    }

    /**
     * Listen for a FlowPort event
     * @param type
     * @param {function(FlowPortEvent)} listener
     */
    static on(type, listener) {
        let name = FlowPortEvent.getEventName(type);
        //console.log("addEventListener",name,listener)
        document.addEventListener(name, listener);
    }

}