import FlowNode from "./parts/FlowNode.mjs";
import Point from "./geometry/Point.mjs";
import FlowConnection from "./parts/FlowConnection.mjs";
import FlowGrid from "./FlowGrid.mjs";

export default class TestScene extends FlowGrid{
    constructor(window,jQuery,$containerElem) {
        super(window,jQuery,$containerElem);
    }

    prepareTestScene(){
        let $ = this.jQuery;

        let n = new FlowNode('test');
        n.point = new Point(0,0);
        n.addInPort('test');
        n.addInPort('test');
        let pout = n.addOutPort('test');
        let html2 = n.render($);

        n = new FlowNode('test');
        n.point = new Point(200,200);
        let pin= n.addInPort('test');
        n.addInPort('test');
        n.addOutPort('test');
        let html3 = n.render($);


        this.$container.append($(html2));
        this.$container.append($(html3));


        this.testConnection = new FlowConnection('test');
        this.testConnection.outPort = pout;
        this.testConnection.inPort = pin;

        this.testConnection2 = new FlowConnection('test');
        this.testConnection2.outPort = pout;
        this.testConnection2.inPort = null;


        setTimeout(()=>{
            scene.$container[0].style.scale=0.7;
        },250)
    }

    updateTestScene(){
        this.canvas.fillViewport(this.viewport);
        this.testConnection.updatePosition(this);
        this.testConnection2.updatePosition(this);

    }

    drawTestScene(){
        this.canvas.drawGridlines();
        this.testConnection.renderSpline(this.canvas);
        this.testConnection2.renderSpline(this.canvas);
    }


}