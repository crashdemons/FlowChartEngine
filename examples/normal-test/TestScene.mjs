import FlowNode from "../../parts/FlowNode.mjs";
import Point from "../../geometry/Point.mjs";
import FlowArrow from "../../parts/FlowArrow.mjs";
import FlowGrid from "../../FlowGrid.mjs";
import FlowScene from "../../FlowScene.mjs";

export default class TestScene extends FlowScene {
    constructor(window, jQuery, $containerElem) {
        super();
        this.createTestGrid(window, jQuery, $containerElem);
        this.createTestDrawables();
    }

    createTestGrid(window, jQuery, $containerElem) {
        let grid = new FlowGrid(window, jQuery, $containerElem);
        this.setGrid(grid);
    }

    createTestDrawables() {
        let $ = this.grid.jQuery;

        let n = new FlowNode('test');
        n.point = new Point(0, 0);
        n.addInPort('test');
        n.addInPort('test');
        let pout = n.addOutPort('test');
        //let html2 = n.render($);

        let n2 = new FlowNode('test');
        n2.point = new Point(200, 200);
        let pin = n2.addInPort('test');
        n2.addInPort('test');
        n2.addOutPort('test');
        //let html3 = n.render($);


        //this.$container.append($(html2));
        //this.$container.append($(html3));


        let testConnection = new FlowArrow('test');
        testConnection.connectPorts(pin, pout);

        let testConnection2 = new FlowArrow('test');
        testConnection2.connectStart(pout);
        //testConnection2.outPort = pout;
        //testConnection2.inPort = null;


        this.addDrawable(n)
        this.addDrawable(n2)
        this.addDrawable(testConnection)
        this.addDrawable(testConnection2)
    }


}