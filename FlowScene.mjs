import FlowEdge from "./primitives/FlowEdge.js";

/**
 * An object providing methods for setting up a flowchart "scene" to be displayed on a {@link FlowGrid} in a less manual fashion.
 *
 * This allows you to add all the drawable objects to the scene, prepare them all, update their positions all at once, and draw them all at once.
 * This object also updates the canvas sizing automatically during "updates".
 *
 * This pattern can be used to start a flowchart:
 *  - create your container element or prepare HTML with an existing container element.
 *  - create a FlowGrid
 *  - create a FlowScene
 *  - create and add all of your drawable flowchart objects to the scene
 *
 *  Then this pattern can be used to draw the flowchart:
 *  - call scene.{@link prepare} - this will add the DOM version of the objects to the flowchart and perform other setup for non-DOM objects.
 *  - perform these steps in a timed loop or interval:
 *    - call scene.{@link update} - this will recalculate the positions of flowchart objects, the canvas sizing, and other "logic" steps for flowchart objects.
 *    - call scene.{@link draw} - this will draw the updated objects and canvas gridlines.
 *
 * {@link window.requestAnimationFrame} is recommended for setting up draw loops.
 *
 */
export default class FlowScene {
    /** A list of drawables added to the scene
     * @type {FlowDrawable[]} */
    drawables = [];
    /** The Flow grid (drawable area) to be used by the scene.
     * @type {FlowGrid} */
    grid = null;

    /** Create a new flowchart scene */
    constructor() {
    }

    /** Retrieve the {@link FlowCanvas} associated with the drawable area */
    get canvas() {
        return this.grid?.canvas;
    }

    /** Sets the FlowGrid (drawable area) associated with the scene
     * @param {FlowGrid} grid */
    setGrid(grid) {
        this.grid = grid;
    }


    /** Adds a flowchart drawable object to the scene
     * @param {FlowDrawable} obj
     * @param {boolean} prepare whether to render and append the new object to the FlowGrid container. (this is used if you're adding an object on the fly)
     * */
    addDrawable(obj,prepare=false) {
        this.drawables.push(obj);
        if(prepare){
            let elem = obj.render($);
            this.grid.appendDrawableElement(elem);
        }
    }



    /** Removes a flowchart drawable object from the scene
     * @param {FlowDrawable} obj
     * */
    removeDrawable(obj){
        obj.$element?.remove();
        let iFound = -1;
        for(let i=0;i<this.drawables.length;i++){
            if(this.drawables[i]?.id===obj.id){
                iFound = i; break;
            }
        }
        if(iFound!==-1) this.drawables.splice(iFound,1);
    }

    /**
     * Gets the first FlowEdge in the scene which is tracking the mouse position. Otherwise, null is returned
     *
     * @return {FlowEdge|null}
     */
    getMouseConnection(){
        for(let drawable of this.drawables){
            console.log("draw",drawable instanceof FlowEdge,drawable);
            if(drawable instanceof FlowEdge){
                if(drawable.isTrackingMouse) return drawable;
            }
        }
        return null;
    }



    /** Prepares flowchart objects for drawing and renders DOM-based objects to the drawable area (since they are not redrawn)*/
    prepare() {
        if (!this.grid) return;
        let $ = this.grid.jQuery;
        for (let drawable of this.drawables) {
            let elem = drawable.render($);
            this.grid.appendDrawableElement(elem);
        }
    }

    /** Clears drawable objects from the FlowGrid */
    unprepare() {
        if (!this.grid) return;
        this.grid.clearDrawables();
    }


    /** Recalculates the internal positioning of drawable objects, resizes the canvas, and performs other logic steps for flowchart objects */
    update() {
        this.canvas.fillViewport(this.grid.viewport);
        for (let drawable of this.drawables) {
            drawable.updatePosition(this.grid);
        }
    }

    /** Perform any drawing steps needed to update the display of the flowchart. This will redraw canvas-drawn objects and canvas gridlines. */
    draw() {
        if (!this.canvas) return;
        this.canvas.drawGridlines();
        for (let drawable of this.drawables) {
            drawable.drawCanvas(this.canvas);
        }
    }


}