import FlowInPort from "./FlowInPort.mjs";
import FlowOutPort from "./FlowOutPort.mjs";
import FlowConnection from "../primitives/FlowConnection.js";

/**
 * A flow object representing a directional "edge"/line-segment between an output port and an input port.  This is canvas-drawn only, but is positioned relative to existing port DOM elements.
 *
 * With the current implementation, at least one end of the connection must be assigned to a port.  If only one is assigned, the unassigned end will track the mouse position.
 */
export default class FlowConnectionDirectional extends FlowConnection { //TODO: abstract so we don't need directional ports?
    /** @constant */
    static PORT_OUT = FlowConnection.PORT_START;
    /** @constant */
    static PORT_END  = FlowConnection.PORT_END;

    /**
     * Construct a new connection
     * @param connectionType the child type-name of the connection
     * @param id An ID value.  If none is provided, a random UUID will be assigned.
     */
    constructor(connectionType, id = null) {
        super('connection', id);
        this.connectionType = connectionType;
    }


    // noinspection JSCheckFunctionSignatures
    /**
     * Connects the line segment to port at the appropriates end (in and out). If a port is already connected at that end, that end of the connection will be replaced with the new port.
     * @param {FlowInPort} inPort
     * @param {FlowOutPort} outPort
     */
    connectPorts(inPort, outPort) {
        this.connectStart(outPort);
        this.connectEnd(inPort);
    }

    // noinspection JSCheckFunctionSignatures
    /**
     * Connects the line segment to port at the appropriates end (in or out). If a port is already connected at that end, that end of the connection will be replaced with the new port.
     * @param {FlowInPort} inPort
     */
    connectEnd(inPort) {
        super.connectEnd(inPort);
    }

    // noinspection JSCheckFunctionSignatures
    /**
     * Connects the line segment to port at the appropriates end (in or out). If a port is already connected at that end, that end of the connection will be replaced with the new port.
     * @param {FlowOutPort} outPort
     */
    connectStart(outPort) {
        super.connectStart(outPort);
    }

    /**
     * Connects the line segment to a port at the appropriate end (in or out). If a port is already connected at that end, that end of the connection will be replaced with the new port.
     * @param {FlowInPort|FlowOutPort} port
     */
    connectPort(port) {
        if (port instanceof FlowInPort) this.connectEnd(port)
        else if (port instanceof FlowOutPort) this.connectStart(port)
        console.log("connection", this, port);
    }


}