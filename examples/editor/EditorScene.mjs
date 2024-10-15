import FlowNode from "../../parts/FlowNode.mjs";
import Point from "../../geometry/Point.mjs";
import FlowArrow from "../../parts/FlowArrow.mjs";
import FlowGrid from "../../FlowGrid.mjs";
import FlowScene from "../../FlowScene.mjs";

export default class EditorScene extends FlowScene {
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
    }


}