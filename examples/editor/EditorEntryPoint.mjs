import EditorScene from "./EditorScene.mjs";
import FlowPort from "../../primitives/FlowPort.mjs";
import NodeType1 from "./NodeType1.mjs";
import Point from "../../geometry/Point.mjs";
import FlowArrow from "../../parts/FlowArrow.mjs";
import FlowInPort from "../../parts/FlowInPort.mjs";
import FlowOutPort from "../../parts/FlowOutPort.mjs";

export default class EditorEntryPoint {
    run(window) {
        let [console, document, $] = [window.console, window.document, window.jQuery];


        /*
                window.addEventListener("mousemove",(evt)=>{
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.restore();
                    this.drawGrid(canvas,ctx);
                    ctx.save();


                   // FlowLine.drawSpline(canvas,ctx,100,100,evt.clientX,evt.clientY)
                })*/


        let scene = new EditorScene(window, jQuery, $('.flow2'));
        scene.prepare();

        window.scene = scene;




        function frame() {
            //console.debug("frame");
            scene.update();
            scene.draw();
            window.requestAnimationFrame(frame);
        }

        window.frame = frame;

        this.prepareEditor(scene);

        frame();


    }

    /** @param {EditorScene} scene */
    prepareEditor(scene){
        let flowContainer = scene.grid.$container;//('.flow2');
        let dragOptions = $(".sidebar > .option");
        dragOptions.on('dragstart',(evt)=>{
            console.log("DRAG",evt);
            evt.originalEvent.dataTransfer.setData('application/editor-option','menu-option');
        })
        flowContainer.on('dragover',(evt)=>{
            evt.preventDefault();///allow drop
        })
        flowContainer.on('drop',(evt)=>{
            let str =  evt.originalEvent.dataTransfer.getData('application/editor-option');
            console.log("DROP",evt,str)
            if(str!=='menu-option') return;

            let node = new NodeType1();
            let mousePt = scene.grid.mousePt.clone().subtract(-25,-25);
            console.log(mousePt);
            //mousePt = mousePt.subtractOffset(scene.grid.viewport.outerPosition);
            node.point = mousePt;
            scene.addDrawable(node,true);
        })

        FlowPort.on('click dragevent', (evt) => {
            let conn = scene.getMouseConnection();
            console.log("conntrack",conn);
            if(conn!==null){ //existing connection is tracking the mouse - try to complete it.
                this.handleSelectPortWithConnection(evt,scene,conn);

            }else{
                this.handleSelectPortWithoutConnection(evt,scene);
            }
        })

        FlowPort.onDragTo(flowContainer,(evt,id)=>{
            let $target = $(evt.target);
            console.log("FlowPort Drop",id,evt,$target);
            /*if($target.hasClass('flow-port')){
                $target = $target.parents('.flow-node').first();
                let id = $target.attr('flow-id')??null;

                let node = scene.findDrawable(id);


            }*/



            if($target.hasClass('flow-port')){
                let id = $target.attr('data-flow-id')??null;
                let port = scene.findDrawable(id);
                console.log(" drop on port",id,port,scene.drawables.map(d=>d?.id));
                if(port!==null){
                    evt.port = port;
                    console.log("  handleSelectPort",port);
                    this.handleSelectPort(evt,scene,null);
                }
            }else{
                console.log(" drop on nothing");
                let conn = scene.getMouseConnection();
                if(conn!==null){
                    scene.removeDrawable(conn);
                }
            }
        })
    }

    handleSelectPort(evt,scene,conn){
        if(conn!==null){ //existing connection is tracking the mouse - try to complete it.
            this.handleSelectPortWithConnection(evt,scene,conn);

        }else{
            this.handleSelectPortWithoutConnection(evt,scene);
        }
    }

    /**
     *
     * @param {FlowPortEvent} evt
     * @param {FlowScene} scene
     * @param {FlowEdge} conn
     */
    handleSelectPortWithConnection(evt, scene, conn){
        //gather some information about the port we clicked and the node it's attached to.
        let clickPortId = evt.port.id;
        let clickNodeId = evt.port.parentNode?.id;

        let portIds = conn.ports.filter(p=>p!==null).map(p=>p.id);
        if(portIds.includes(clickPortId)){
            alert("This example detects when you click the same port a line began at, and removes it.\r\nPOOF!");
            scene.removeDrawable(conn);
            return;
        }

        let connNodes = conn.getConnectedNodes();
        let connNodeIds = connNodes.map(n=>n.id);
        if(connNodeIds.includes(clickNodeId)){
            alert("This example prevents you from attaching the node to itself.")
            return;
        }

        if(conn.endPort===null && evt.port instanceof FlowInPort){ this.removePortConnections(evt.port); conn.connectEnd(evt.port); }
        else if(conn.startPort===null &&  evt.port instanceof FlowOutPort){ this.removePortConnections(evt.port); conn.connectStart(evt.port); }
    }



    /** @type {FlowPort} */
    removePortConnections(port){
        console.log(" port has existing edges",port.edges.length);
        for(/** @type {FlowEdge} */let edge of port.edges){
            console.log("  removing",edge);
            scene.removeDrawable(edge);
        }
    }

    handleSelectPortWithoutConnection(evt, scene){
        console.log("port click event", evt.port);
        if(evt.port.edges.length){//if the port has edges, delete them
            alert("This example detects when you clicked a port with existing edges and replaces them with a new one");
            this.removePortConnections(evt.port);
        }else{

            console.log(" port has no existing edges",evt.port.edges.length);
        }
        let edge = new FlowArrow('ed-conn');
        edge.connectPort(evt.port);
        scene.addDrawable(edge,true);
    }


}