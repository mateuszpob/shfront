/*
 * 
 * @type DrawController
 */
var DrawController = {
    canvas: null,
    ctx: null,
    canvasOffsetX: 10,
    canvasOffsetY: 10,
    currentEvent: null, // ustawiamy na panelu co teraz ma byc robione
    init: function () {
        this.canvas = document.getElementById('home-canvas');
        this.ctx = this.canvas.getContext("2d");

        this.canvasOffsetX = this.canvas.offsetLeft;
        this.canvasOffsetY = this.canvas.offsetTop;

        this.addEventListeners();

        setTimeout(function () {
            DrawController.canvasOffsetX = DrawController.canvas.offsetLeft;
            DrawController.canvasOffsetY = DrawController.canvas.offsetTop;
        }, 1000);

        DrawController.run();

    },
    conf: {
        FPS: 30
    },
    btn: {
        addRoom: document.getElementById('addNewRoom'),
        submitRoom: document.getElementById('submitRoom'),
    },
    mouseState: {
        eventCounter: 0, // do sprawdzania czy up czy down
        x: 0,
        y: 0,
        dragStartX: null,
        dragStartY: null,
        down: function () {
            this.eventCounter++;
        },
        up: function () {
            this.eventCounter--;
        },
        isDown: function () {
            if (this.eventCounter > 0)
                return true;
            return false;
        },
        move: function (e) {
            var inst = this;
            this.realX = e.pageX - DrawController.canvasOffsetX;
            this.realY = e.pageY - DrawController.canvasOffsetY;
            this.x = parseInt((this.realX) / 10) * 10;
            this.y = parseInt((this.realY) / 10) * 10;
            
            
            InteriorItemPanel.items.forEach(function (o, i) {
                if(inst.isDown()){
                    if(o.downOnSomeObject(inst.realX, inst.realY)){ 
                        o.dragStarted = true;
                    }
                    
                    if(o.dragStarted) {
                        o.startDrag(inst.x, inst.y);
                    } else {
                        o.stopDrag();
                    }
                } else {
                    o.dragStarted = false;
                }
                
            });
            
            if(this.isDown()){
                DrawController.drawingObjects.forEach(function (o, i) {
                    o.downOnSomeObject(inst.x, inst.y);
                });
            }else{
                this.dragStartX = this.x;
                this.dragStartY = this.y;
            }
        }
    },
    /*
     * Obsługa panelu z przyciskami
     */
    navigate: {
        addNewRoom: function (e) {
            DrawController.currentEvent = 'DRAW_ROOM';
        },
        submitRoom: function (e) {
            DrawController.currentEvent = 'NONE';
            DrawController.handleDrawing.resetTempDrawObject();
            DrawController.drawingObjects.push(new Room(
                    DrawController.handleDrawing.submitedX,
                    DrawController.handleDrawing.submitedY,
                    DrawController.handleDrawing.width,
                    DrawController.handleDrawing.height,
                    DrawController.drawingObjects.length + 1
                    ));
        },
        roomNavPanel: {
            roomId: null,
            panel: document.getElementById('roomNavPanel'),
            init: function (id) {
                this.roomId = id;
//                this.panel.classList.remove('hidden');
            },
            final: function () {
                this.id = null;
//                this.panel.classList.add('hidden');
            }
        }
    },
    /*
     * Zapisane elementy, przerysowywane w pętli
     */
    drawingObjects: [],
    drawSubmited: function () {
        this.drawingObjects.forEach(function (o, i) {
            o.draw();
        });
    },
    /*
     * Rysowanie itemów, których można urzyć w pokoju
     */
    drawPanelInteriorItems: function() {
        InteriorItemPanel.drawItemsOnPanel();
    },
    handleDrawing: {
        lastX: 0,
        lastY: 0,
        width: 0,
        height: 0,
        submitedX: 0,
        submitedY: 0,
        tempRoom: {
            x: null,
            y: null,
            width: null,
            height: null,
            draw: function () {}
        },
        drawDynamicRect: function () {

            if (DrawController.mouseState.isDown()) {

                this.tempRoom = new Room().setStroke('#ff0000');
                this.tempRoom.x = this.lastX;
                this.tempRoom.y = this.lastY;
                this.tempRoom.width = DrawController.mouseState.x - this.lastX;
                this.tempRoom.height = DrawController.mouseState.y - this.lastY;


                this.submitedX = this.lastX;
                this.submitedY = this.lastY;
                this.width = DrawController.mouseState.x - this.lastX;
                this.height = DrawController.mouseState.y - this.lastY;

            } else {
                this.lastX = DrawController.mouseState.x;
                this.lastY = DrawController.mouseState.y;
            }
        },
        resetTempDrawObject: function () {
            this.tempRoom = {
                draw: function () {}
            };
        }
    },
    clickOnObject: function (e) {
        x = e.pageX - this.canvasOffsetX;
        y = e.pageY - this.canvasOffsetY;
        this.drawingObjects.forEach(function (o, i) {
            o.clickOnSomeObject(x, y);
        });
//        InteriorItemPanel.items.forEach(function (o, i) {
//            o.clickOnSomeObject(x, y);
//        });
    },
    drawHelpers: {
        degreesToRadians: function (degrees) {
            return (degrees * Math.PI) / 180;
        }
    },

    addEventListeners: function () {
        var inst = this;
        this.canvas.addEventListener('mousedown', function (e) {
            inst.mouseState.down(e)
        });
        this.canvas.addEventListener('mouseup', function (e) {
            inst.mouseState.up(e)
        });
        this.canvas.addEventListener('mousemove', function (e) {
            DrawController.mouseState.move(e)
        });
        this.canvas.addEventListener('click', function (e) {
            DrawController.clickOnObject(e)
        });


        // Nav Buttons
        this.btn.addRoom.addEventListener('click', function (e) {
            inst.navigate.addNewRoom(e)
        });
        this.btn.submitRoom.addEventListener('click', function (e) {
            inst.navigate.submitRoom(e)
        });
    },

    draw: function () {
        this.drawSubmited();
        this.drawPanelInteriorItems();
        this.handleDrawing.tempRoom.draw(); // to co jest w tej chwili rysowane a nie zatwierdzone
    },
    update: function () {
        switch (this.currentEvent) {
            case 'DRAW_ROOM':
                this.handleDrawing.drawDynamicRect();
                break;
        }
    },
    run: function () {
        setInterval(function () {
            //console.log('Wiatrak sie kreci')
            DrawController.ctx.clearRect(0, 0, DrawController.canvas.width, DrawController.canvas.height);
            DrawController.update();
            DrawController.draw();
        }, 1000 / DrawController.conf.FPS);
    }
};