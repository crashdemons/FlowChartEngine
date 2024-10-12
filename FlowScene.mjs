import FlowDrawable from "./primitives/FlowDrawable.mjs";
import FlowGrid from "./FlowGrid.mjs";

export default class FlowScene{
    /** @type {FlowDrawable[]} */
    drawables = [];
    /** @type {FlowGrid} */
    grid = null;

    get canvas(){
        return this.grid?.canvas;
    }

    constructor() {
    }

    /** @param {FlowGrid} grid */
    setGrid(grid){
        this.grid = grid;
    }

    /** @param {FlowCanvas} canvas */
    setCanvas(canvas){
        this.canvas=canvas;
    }

    /** @param {FlowDrawable} obj */
    addDrawable(obj){
        this.drawables.push(obj);
    }


    prepare(){
        if(!this.grid) return;
        let $ = this.grid.jQuery;
        for(let drawable of this.drawables){
            let elem = drawable.render($);
            this.grid.appendDrawableElement(elem);
        }
    }
    unprepare(){
        if(!this.grid) return;
        this.grid.clearDrawables();
    }


    update(){
        this.canvas.fillViewport(this.grid.viewport);
        for(let drawable of this.drawables){
            drawable.updatePosition(this.grid);
        }
    }
    draw(){
        if(this.canvas) this.canvas.drawGridlines();
        for(let drawable of this.drawables){
            drawable.drawCanvas(this.canvas);
        }
    }


}