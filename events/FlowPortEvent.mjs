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
     * @param types
     * @param {function(FlowPortEvent)} listener
     */
    static on(types, listener) {
        let typeArray = types.split(' ');
        for(let type of typeArray){
            let name = FlowPortEvent.getEventName(type);
            //console.log("addEventListener",name,listener)
            document.addEventListener(name, listener);
        }
    }

    /**
     * Captures an event of a port to be dragged and dropped on a location of a container.
     *
     * Note: this enables the item to be dropped there.
     *
     * @param {JQuery} $container
     * @param {function(FlowPortEvent,id:string)} listener
     */
    static onDragTo($container,listener){
        $container.on('dragover',(jEvt)=>{
            let id = jEvt.originalEvent.dataTransfer.getData(FlowEvent.TRANSFER_ID_FORMAT)??null;
            if(FlowPortEvent.isTransferID(id)){
                jEvt.originalEvent.dropEffect = "link";
                jEvt.preventDefault();//allow drop
            }
        })
        $container.on('drop',(jEvt)=>{
            let id = jEvt.originalEvent.dataTransfer.getData(FlowEvent.TRANSFER_ID_FORMAT)??null;
            if(FlowPortEvent.isTransferID(id)){
                listener(jEvt,FlowPortEvent.getTransferID(id));
            }
        })
    }

    static TRANSFER_PREFIX = "flowce:port:";
    static createTransferID(port){
        return FlowPortEvent.TRANSFER_PREFIX+port.id;
    }
    static isTransferID(text){
        return typeof text==='string' && text.startsWith(FlowPortEvent.TRANSFER_PREFIX);
    }
    static getTransferID(text){
        if(!FlowPortEvent.isTransferID(text)) return null;
        return text.substring(FlowPortEvent.TRANSFER_PREFIX.length);
    }

}