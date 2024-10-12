
/** An event relating to the flowchart or an element*/
export default class FlowEvent extends CustomEvent{
    static PREFIX = "flowce";
    flowEventType;
    constructor(type,options={},bubbles=true,cancelable) {
        if(typeof options.bubbles==='undefined') options.bubbles=true;
        if(typeof options.cancelable==='undefined') options.cancelable=false;
        super(FlowEvent.getEventName(type),options);
        this.flowEventType=type;
    }

    /** Get the full custom event name used with CustomEvent and addEventListener */
    static getEventName(type){
        return FlowEvent.PREFIX+":"+type;
    }

    /**
     * Listen for a flowchart event
     * @param type
     * @param {function(FlowPortEvent)} listener
     */
    static on(type,listener){
        let name = FlowEvent.getEventName(type);
        //console.log("addEventListener",name,listener)
        document.addEventListener(name,listener);
    }

}