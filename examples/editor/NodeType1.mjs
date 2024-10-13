import FlowNode from "../../parts/FlowNode.mjs";


export default class NodeType1 extends FlowNode{
    constructor(... props) {
        super(... props);
        this.addInPort('t1-in');
        this.addOutPort('t1-out');
    }

}