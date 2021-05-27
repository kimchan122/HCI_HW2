let WebUI = {}

WebUI.WidgetTypes = {
    UNDEFINED: "undefind",
    TEXT: "text",
    IMAGE: "image",
    PUSH_BUTTON: "push_button",
    TEXT_FIELD: "text_field",
    SWITCH: "switch",

    // ADD NEW WIDGET TYPES HERE
    CONTAINER: "container",
    ROW: "row",
    COLUMN: "column",

    GRAPHPLOT: "graph_plot",
    REPORT: "report"
};

WebUI.Alignment = {
    // ADD ALIGNMENT TYPES HERE
    CENTER: "center",
    LEFT: "left",
    RIGHT: "right",
    TOP: "top",
    BOTTOM: "bottom"
};

WebUI.widgets = [];
WebUI.focused_widget = null;
WebUI.dragged_widget = null;
WebUI.hovered_widget = null;

WebUI.is_mouse_dragging = false;
WebUI.mouse_drag_start = {
    x: 0,
    y: 0
};
WebUI.mouse_drag_prev = {
    x: 0,
    y: 0
};

WebUI.app = null;

WebUI.res = '0';
WebUI.displayValue = '0';
WebUI.f='0';

WebUI.initialize = function () {
    this.canvas = new fabric.Canvas("c", {
        backgroundColor: "#505050",
        hoverCursor: "default",
        selection: false,
        width: window.innerWidth,
        height: window.innerHeight,
    });
    //
    $(document).keypress(function (event) {
        WebUI.handleKeyPress(event);
    });
    $(document).mousedown(function (event) {
        let p = {
            x: event.pageX,
            y: event.pageY
        };
        WebUI.handleMouseDown(p);
    });
    $(document).mouseup(function (event) {
        let p = {
            x: event.pageX,
            y: event.pageY
        };
        WebUI.handleMouseUp(p);
    });
    $(document).mousemove(function (event) {
        let p = {
            x: event.pageX,
            y: event.pageY
        };
        WebUI.handleMouseMove(p);
    });
    $(document).ready(function () {
        plot();
    });
    //
    WebUI.initWidgets();
    WebUI.initVisualItems();
    WebUI.layoutWhenResourceReady();
}

WebUI.initWidgets = function () {
    // INITIALIZE WIDGETS HERE
    WebUI.app = new WebUI.Column({
        children: [
            new WebUI.Row({
                children: [
                    new WebUI.Container({
                        desired_size: {
                            width: 500,
                            height: 40
                        },
                        horizontal_alignment: WebUI.Alignment.CENTER,
                        vertical_alignment: WebUI.Alignment.BOTTOM,
                        children: [
                            new WebUI.Text("계산기", {
                                width: 200,
                                height: 40,
                            }),
                        ],
                    }),
                    new WebUI.Container({
                        desired_size: {
                            width: 459,
                            height: 80
                        },
                        horizontal_alignment: WebUI.Alignment.RIGHT,
                        vertical_alignment: WebUI.Alignment.CENTER,
                        children: [
                            new WebUI.TextField(WebUI.res, {
                                width: 416,
                                height: 40,
                            })
                        ],
                    }),
                    new WebUI.Column({
                        desired_size: {
                            width: 500,
                            height: 280
                        },
                        children: [
                            new WebUI.Row({
                                desired_size: {
                                    width: 40,
                                    height: 280
                                },
                                children: [
                                    new WebUI.CalcButton("=", {
                                        width: 40,
                                        height: 40,
                                    }, 16, 'rgb(255,255,255)', '#313131'),
                                    new WebUI.CalcButton("<", {
                                        width: 40,
                                        height: 40
                                    }, 16, 'rgb(255,255,255)', '#313131'),
                                    new WebUI.CalcButton(">", {
                                        width: 40,
                                        height: 40
                                    }, 16, 'rgb(255,255,255)', '#313131'),
                                    new WebUI.CalcButton("<=", {
                                        width: 40,
                                        height: 40
                                    }, 16, 'rgb(255,255,255)', '#313131'),
                                    new WebUI.CalcButton(">=", {
                                        width: 40,
                                        height: 40
                                    }, 16, 'rgb(255,255,255)', '#313131'),
                                    new WebUI.CalcButton("==", {
                                        width: 40,
                                        height: 40
                                    }, 16, 'rgb(255,255,255)', '#313131'),
                                    new WebUI.CalcButton("!=", {
                                        width: 40,
                                        height: 40
                                    }, 16, 'rgb(255,255,255)', '#313131'),
                                ]
                            }),
                            new WebUI.Row({
                                desired_size: {
                                    width: 40,
                                    height: 280
                                },
                                children: [
                                    new WebUI.CalcButton("i", {
                                        width: 40,
                                        height: 40
                                    }, 16, 'rgb(255,255,255)', '#313131'),
                                    new WebUI.CalcButton(":", {
                                        width: 40,
                                        height: 40
                                    }, 16, 'rgb(255,255,255)', '#313131'),
                                    new WebUI.CalcButton(";", {
                                        width: 40,
                                        height: 40
                                    }, 16, 'rgb(255,255,255)', '#313131'),
                                    new WebUI.CalcButton("exp", {
                                        width: 40,
                                        height: 40
                                    }, 16, 'rgb(255,255,255)', '#313131'),
                                    new WebUI.CalcButton("sqrt", {
                                        width: 40,
                                        height: 40
                                    }, 16, 'rgb(255,255,255)', '#313131'),
                                    new WebUI.CalcButton("log", {
                                        width: 40,
                                        height: 40
                                    }, 16, 'rgb(255,255,255)', '#313131'),
                                    new WebUI.CalcButton("cross", {
                                        width: 40,
                                        height: 40
                                    }, 16, 'rgb(255,255,255)', '#313131'),
                                ]
                            }),
                            new WebUI.Row({
                                desired_size: {
                                    width: 240,
                                    height: 280,
                                },
                                children: [
                                    new WebUI.Column({
                                        desired_size: {
                                            width: 240,
                                            height: 40,
                                        },
                                        children: [
                                            new WebUI.CalcButton("pi", {
                                                width: 40,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#313131'),
                                            new WebUI.CalcButton("e", {
                                                width: 40,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#313131'),
                                            new WebUI.CalcButton("w", {
                                                width: 40,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#313131'),
                                            new WebUI.CalcButton("x", {
                                                width: 40,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#313131'),
                                            new WebUI.CalcButton("CL", {
                                                width: 80,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#1d731d'),
                                        ]
                                    }),
                                    new WebUI.Column({
                                        desired_size: {
                                            width: 240,
                                            height: 40,
                                        },
                                        children: [
                                            new WebUI.CalcButton("[", {
                                                width: 40,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#313131'),
                                            new WebUI.CalcButton("]", {
                                                width: 40,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#313131'),
                                            new WebUI.CalcButton("y", {
                                                width: 40,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#313131'),
                                            new WebUI.CalcButton("z", {
                                                width: 40,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#313131'),
                                            new WebUI.CalcButton("det", {
                                                width: 80,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#313131'),
                                        ]
                                    }),
                                    new WebUI.Column({
                                        desired_size: {
                                            width: 240,
                                            height: 40,
                                        },
                                        children: [
                                            new WebUI.CalcButton("(", {
                                                width: 40,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#313131'),
                                            new WebUI.CalcButton(")", {
                                                width: 40,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#313131'),
                                            new WebUI.CalcButton("f", {
                                                width: 40,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#313131'),
                                            new WebUI.CalcButton("g", {
                                                width: 40,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#313131'),
                                            new WebUI.CalcButton("!", {
                                                width: 80,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#313131'),
                                        ]
                                    }),
                                    new WebUI.Column({
                                        desired_size: {
                                            width: 240,
                                            height: 40,
                                        },
                                        children: [
                                            new WebUI.CalcButton("7", {
                                                width: 82,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#1b1b1b'),
                                            new WebUI.CalcButton("8", {
                                                width: 82,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#1b1b1b'),
                                            new WebUI.CalcButton("9", {
                                                width: 80,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#1b1b1b'),
                                        ]
                                    }),
                                    new WebUI.Column({
                                        desired_size: {
                                            width: 240,
                                            height: 40,
                                        },
                                        children: [
                                            new WebUI.CalcButton("4", {
                                                width: 82,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#1b1b1b'),
                                            new WebUI.CalcButton("5", {
                                                width: 82,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#1b1b1b'),
                                            new WebUI.CalcButton("6", {
                                                width: 80,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#1b1b1b'),
                                        ]
                                    }),
                                    new WebUI.Column({
                                        desired_size: {
                                            width: 240,
                                            height: 40,
                                        },
                                        children: [
                                            new WebUI.CalcButton("1", {
                                                width: 82,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#1b1b1b'),
                                            new WebUI.CalcButton("2", {
                                                width: 82,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#1b1b1b'),
                                            new WebUI.CalcButton("3", {
                                                width: 80,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#1b1b1b'),
                                        ]
                                    }),
                                    new WebUI.Column({
                                        desired_size: {
                                            width: 240,
                                            height: 40,
                                        },
                                        children: [
                                            new WebUI.CalcButton(".", {
                                                width: 40,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#1b1b1b'),
                                            new WebUI.CalcButton(",", {
                                                width: 40,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#1b1b1b'),
                                            new WebUI.CalcButton("0", {
                                                width: 82,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#1b1b1b'),
                                            new WebUI.CalcButton("EV", {
                                                width: 80,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#1d4d73'),
                                        ]
                                    }),
                                ]
                            }),
                            new WebUI.Row({
                                desired_size: {
                                    width: 80,
                                    height: 280
                                },
                                children: [
                                    new WebUI.CalcButton("BACK", {
                                        width: 82,
                                        height: 40,
                                    }, 16, 'rgb(255,255,255)', '#731d1d'),
                                    new WebUI.CalcButton("sin", {
                                        width: 82,
                                        height: 40
                                    }, 16, 'rgb(255,255,255)', '#313131'),
                                    new WebUI.CalcButton("cos", {
                                        width: 82,
                                        height: 40
                                    }, 16, 'rgb(255,255,255)', '#313131'),
                                    new WebUI.CalcButton("tan", {
                                        width: 82,
                                        height: 40
                                    }, 16, 'rgb(255,255,255)', '#313131'),
                                    new WebUI.Column({
                                        desired_size: {
                                            width: 82,
                                            height: 40,
                                        },
                                        children: [
                                            new WebUI.CalcButton("%", {
                                                width: 40,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#313131'),
                                            new WebUI.CalcButton("^", {
                                                width: 40,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#313131'),
                                        ]
                                    }),
                                    new WebUI.Column({
                                        desired_size: {
                                            width: 82,
                                            height: 40,
                                        },
                                        children: [
                                            new WebUI.CalcButton("*", {
                                                width: 40,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#313131'),
                                            new WebUI.CalcButton("/", {
                                                width: 40,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#313131'),
                                        ]
                                    }),
                                    new WebUI.Column({
                                        desired_size: {
                                            width: 82,
                                            height: 40,
                                        },
                                        children: [
                                            new WebUI.CalcButton("+", {
                                                width: 40,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#313131'),
                                            new WebUI.CalcButton("-", {
                                                width: 40,
                                                height: 40
                                            }, 16, 'rgb(255,255,255)', '#313131'),
                                        ]
                                    }),
                                ]
                            }),
                        ]
                    }),
                ]
            }),
            new WebUI.Row({
                horizontal_alignment: WebUI.Alignment.LEFT,
                vertical_alignment: WebUI.Alignment.BOTTOM,
                desired_size: {
                    width: 520,
                    height: 580
                },
                children: [
                    new WebUI.GraphPlot({
                        width: 520,
                        height: 352
                    }),
                    new WebUI.Column({
                        desired_size:{
                            width:520,
                            height:166,
                        },
                        children:[
                            new WebUI.Report(t1, t2, t3, t4, {
                                width: 300,
                                height: 166
                            }),
                            new WebUI.Column({
                                horizontal_alignment:WebUI.Alignment.CENTER,
                                vertical_alignment: WebUI.Alignment.CENTER,
                                desired_size:{
                                    width:220,
                                    height:166,
                                },
                                children:[
                                    new WebUI.Image("resources/kwlogo.png",{width:120,height:120})
                                ]
                            }),
                        ]
                    })
                ]
            })
        ]
    });
}

let test = "asdf"
let cnt = 0;
//
WebUI.initVisualItems = function () {
    WebUI.widgets.forEach(widget => {
        widget.initVisualItems();
    });
}

WebUI.layoutWhenResourceReady = function () {
    let is_resource_loaded = true;
    for (let i in WebUI.widgets) {
        let widget = WebUI.widgets[i];
        if (!widget.is_resource_ready) {
            is_resource_loaded = false;
            break;
        }
    }

    if (!is_resource_loaded) {
        setTimeout(arguments.callee, 50);
    } else {
        WebUI.app.layout();
        WebUI.canvas.requestRenderAll();
    }
}

WebUI.handleKeyPress = function (event) {
    let is_handled = false;

    if (WebUI.focused_widget) {
        is_handled = WebUI.focused_widget.handleKeyPress(event) || is_handled;
    }

    if (is_handled) {
        WebUI.canvas.requestRenderAll();
    }
}

WebUI.handleMouseDown = function (window_p) {
    let is_handled = false;

    if (WebUI.isInCanvas(window_p)) {
        let canvas_p = WebUI.transformToCanvasCoords(window_p);

        WebUI.is_mouse_dragging = true;
        WebUI.mouse_drag_start = canvas_p;
        WebUI.mouse_drag_prev = canvas_p;

        let widget = WebUI.findWidgetOn(canvas_p);
        if (widget) {
            WebUI.focused_widget = widget;

            if (widget.is_draggable) {
                WebUI.dragged_widget = widget;
            } else {
                WebUI.dragged_widget = null;
            }

            is_handled = widget.handleMouseDown(canvas_p) || is_handled;
        } else {
            WebUI.focused_widget = null;
            WebUI.dragged_widget = null;
        }
    } else {
        WebUI.is_mouse_dragging = false;
        WebUI.mouse_drag_start = {
            x: 0,
            y: 0
        };
        WebUI.mouse_drag_prev = {
            x: 0,
            y: 0
        };

        WebUI.focused_widget = null;
        WebUI.dragged_widget = null;
    }

    if (is_handled) {
        WebUI.canvas.requestRenderAll();
    }
}

WebUI.handleMouseMove = function (window_p) {
    let canvas_p = WebUI.transformToCanvasCoords(window_p);
    let is_handled = false;

    let widget = WebUI.findWidgetOn(canvas_p);
    if (widget != WebUI.hovered_widget) {
        if (WebUI.hovered_widget != null) {
            is_handled = WebUI.hovered_widget.handleMouseExit(canvas_p) || is_handled;
        }
        if (widget != null) {
            is_handled = widget.handleMouseEnter(canvas_p) || is_handled;
        }
        WebUI.hovered_widget = widget;
    } else {
        if (widget) {
            is_handled = widget.handleMouseMove(canvas_p) || is_handled;
        }
    }

    if (WebUI.is_mouse_dragging) {
        if (WebUI.dragged_widget != null) {
            let tx = canvas_p.x - WebUI.mouse_drag_prev.x;
            let ty = canvas_p.y - WebUI.mouse_drag_prev.y;
            WebUI.dragged_widget.translate({
                x: tx,
                y: ty
            });

            is_handled = true;
        }
        WebUI.mouse_drag_prev = canvas_p;
    }

    if (is_handled) {
        WebUI.canvas.requestRenderAll();
    }
}

WebUI.handleMouseUp = function (window_p) {
    let is_handled = false;
    let canvas_p = WebUI.transformToCanvasCoords(window_p);

    let widget = WebUI.findWidgetOn(canvas_p);
    if (widget) {
        is_handled = widget.handleMouseUp(canvas_p) || is_handled;
    }

    if (WebUI.is_mouse_dragging) {
        WebUI.is_mouse_dragging = false;
        WebUI.mouse_drag_start = {
            x: 0,
            y: 0
        };
        WebUI.mouse_drag_prev = {
            x: 0,
            y: 0
        };

        WebUI.dragged_widget = null;

        is_handled = true;
    }

    if (is_handled) {
        WebUI.canvas.requestRenderAll();
    }
}

WebUI.transformToCanvasCoords = function (window_p) {
    let rect = WebUI.canvas.getElement().getBoundingClientRect();
    let canvas_p = {
        x: window_p.x - rect.left,
        y: window_p.y - rect.top
    };
    return canvas_p;
}

WebUI.isInCanvas = function (window_p) {
    let rect = WebUI.canvas.getElement().getBoundingClientRect();
    if (window_p.x >= rect.left &&
        window_p.x < rect.left + rect.width &&
        window_p.y >= rect.top &&
        window_p.y < rect.top + rect.height) {
        return true;
    } else {
        return false;
    }
}

WebUI.findWidgetOn = function (canvas_p) {
    let x = canvas_p.x;
    let y = canvas_p.y;

    for (let i = 0; i < this.widgets.length; i++) {
        let widget = this.widgets[i];

        if (x >= widget.position.left &&
            x <= widget.position.left + widget.size.width &&
            y >= widget.position.top &&
            y <= widget.position.top + widget.size.height) {
            return widget;
        }
    }
    return null;
}

WebUI.maxSize = function (size1, size2) {
    // IMPLEMENT HERE!
    let max_size = {
        width: 0,
        height: 0
    };

    max_size.width = (size1.width > size2.width) ? size1.width : size2.width;
    max_size.height = (size1.height > size2.height) ? size1.height : size2.height;

    return max_size;
}

WebUI.minSize = function (size1, size2) {
    // IMPLEMENT HERE!
    let min_size = {
        width: 0,
        height: 0
    };

    min_size.width = (size1.width < size2.width) ? size1.width : size2.width;
    min_size.height = (size1.height < size2.height) ? size1.height : size2.height;

    return min_size;
}


//
WebUI.Widget = function (properties) {
    this.type = WebUI.WidgetTypes.UNDEFINED;

    this.is_draggable = false;
    this.is_movable = true;

    //
    this.parent = null;
    this.children = [];

    //
    this.position = {
        left: 0,
        top: 0
    };
    this.size = {
        width: 0,
        height: 0
    };

    //
    this.visual_items = [];
    this.is_resource_ready = false;

    //
    WebUI.widgets.push(this);

    // IMPLEMENT HERE: code for adding properties
    if (properties != undefined) {
        for (let name in properties) {
            let value = properties[name];
            if (name == 'children') {
                value.forEach(child => {
                    child.parent = this;
                    this.children.push(child);
                });
            } else {
                this[name] = value;
            }
        }
    }

    //
    this.setDefaultProperty('desired_size', {
        width: 0,
        height: 0
    });
    this.setDefaultProperty('horizontal_alignment', WebUI.Alignment.CENTER);
    this.setDefaultProperty('vertical_alignment', WebUI.Alignment.TOP);
    this.setDefaultProperty('fill_color', 'white');
    this.setDefaultProperty('stroke_color', 'black');
    this.setDefaultProperty('stroke_width', 1);
    this.setDefaultProperty('text_align', 'left');
    this.setDefaultProperty('text_color', 'black');
    this.setDefaultProperty('font_family', 'System');
    this.setDefaultProperty('font_size', 20);
    this.setDefaultProperty('font_weight', 'bold');
    this.setDefaultProperty('padding', 1);
    this.setDefaultProperty('margin', 10);
}

WebUI.Widget.prototype.setDefaultProperty = function (name, value) {
    if (this[name] == undefined) {
        this[name] = value;
    }
}

WebUI.Widget.prototype.getBoundingRect = function () {
    return {
        left: this.position.left,
        top: this.position.top,
        width: this.size.width,
        height: this.size.height
    };
}

WebUI.Widget.prototype.layout = function () {
    // IMPLEMENT HERE!
    this.measure();
    this.arrange(this.position);
}

WebUI.Widget.prototype.measure = function () {
    // IMPLEMENT HERE!
    if (this.children.length > 0) {
        this.size_children = {
            width: 0,
            height: 0
        };
        this.children.forEach(child => {
            let size_child = child.measure();
            this.size_children = this.extendSizeChildren(this.size_children, size_child);
        });
        this.size = WebUI.maxSize(this.desired_size, this.size_children);
    } else {
        this.size.width += this.padding * 2;
        this.size.height += this.padding * 2;
    }
    return this.size;
}

WebUI.Widget.prototype.arrange = function (position) {
    // IMPLEMENT HERE!
    this.moveTo(position);
    this.visual_items.forEach(item => {
        WebUI.canvas.add(item);
    });

    if (this.children.length > 0) {
        let left_spacing = 0,
            top_spacing = 0;

        if (this.size.width > this.size_children.width) {
            let room_width = this.size.width - this.size_children.width;

            if (this.horizontal_alignment == WebUI.Alignment.LEFT) {
                left_spacing = this.padding;
            } else if (this.horizontal_alignment == WebUI.Alignment.CENTER) {
                left_spacing = this.padding + room_width / 2.0;
            } else if (this.horizontal_alignment == WebUI.Alignment.RIGHT) {
                left_spacing = this.padding + room_width;
            }
        }
        if (this.size.height > this.size_children.height) {
            let room_height = this.size.height - this.size_children.height;

            if (this.vertical_alignment == WebUI.Alignment.TOP) {
                top_spacing = this.padding;
            } else if (this.vertical_alignment == WebUI.Alignment.CENTER) {
                top_spacing = this.padding + room_height / 2.0;
            } else if (this.vertical_alignment == WebUI.Alignment.BOTTOM) {
                top_spacing = this.padding + room_height;
            }
        }
        let next_position = {
            left: position.left + left_spacing,
            top: position.top + top_spacing
        };

        this.children.forEach(child => {
            child.arrange(next_position);
            next_position = this.calcNextPosition(next_position, child.size);
        });
    }
}

// default implementation that is expected to be overridden
WebUI.Widget.prototype.extendSizeChildren = function (size, child_size) {
    if (size.width < child_size.width) size.width = child_size.width;
    if (size.height < child_size.height) size.height = child_size.height;

    return size;
}

// default implementation that is expected to be overridden
WebUI.Widget.prototype.calcNextPosition = function (position, size) {
    let next_left = position.left + size.width;
    let next_top = position.top;

    return {
        left: next_left,
        top: next_top
    };
}


WebUI.Widget.prototype.initVisualItems = function () {
    this.is_resource_ready = true;
    return true;
}

WebUI.Widget.prototype.moveTo = function (p) {
    if (!this.is_movable) {
        return;
    }

    let tx = p.left - this.position.left;
    let ty = p.top - this.position.top;

    this.translate({
        x: tx,
        y: ty
    });
}

WebUI.Widget.prototype.translate = function (v) {
    if (!this.is_movable) {
        return;
    }

    this.position.left += v.x;
    this.position.top += v.y;

    this.visual_items.forEach(item => {
        item.left += v.x;
        item.top += v.y;
    });

    this.children.forEach(child_widget => {
        child_widget.translate(v);
    });
}

WebUI.Widget.prototype.destroy = function () {
    if (this == WebUI.focused_widget) WebUI.focused_widget = null;
    if (this == WebUI.dragged_widget) WebUI.dragged_widget = null;
    if (this == WebUI.hovered_widget) WebUI.hovered_widget = null;

    this.visual_items.forEach(item => {
        WebUI.canvas.remove(item);
    });
    this.visual_items = [];

    let index = WebUI.widgets.indexOf(this);
    if (index > -1) {
        WebUI.widgets.splice(index, 1);
    }

    this.children.forEach(child_widget => {
        child_widget.destroy();
    });
    this.children = [];
}

WebUI.Widget.prototype.handleKeyPress = function (event) {
    return false;
}

WebUI.Widget.prototype.handleMouseDown = function (canvas_p) {
    return false;
}

WebUI.Widget.prototype.handleMouseMove = function (canvas_p) {
    return false;
}

WebUI.Widget.prototype.handleMouseUp = function (canvas_p) {
    return false;
}

WebUI.Widget.prototype.handleMouseEnter = function (canvas_p) {
    return false;
}

WebUI.Widget.prototype.handleMouseExit = function (canvas_p) {
    return false;
}

WebUI.Widget.prototype.handleResize = function () {
    return false;
}

//
WebUI.Container = function (properties) {
    WebUI.Widget.call(this, properties);

    this.type = WebUI.WidgetTypes.CONTAINER;
}

WebUI.Container.prototype = Object.create(WebUI.Widget.prototype);
WebUI.Container.prototype.constructor = WebUI.Container;

WebUI.Container.prototype.extendSizeChildren = function (size, child_size) {
    // IMPLEMENT HERE!
    if (size.width < child_size.width) {
        size.width = child_size.width;
    }
    if (size.height < child_size.height) {
        size.height = child_size.height;
    }

    return size;
}

WebUI.Container.prototype.calcNextPosition = function (position, size) {
    // IMPLEMENT HERE!
    let next_left = position.left;
    let next_top = position.top;

    return {
        left: next_left,
        top: next_top
    };
}

//
WebUI.Column = function (properties) {
    WebUI.Widget.call(this, properties);

    this.type = WebUI.WidgetTypes.COLUMN;
}

WebUI.Column.prototype = Object.create(WebUI.Widget.prototype);
WebUI.Column.prototype.constructor = WebUI.Column;

WebUI.Column.prototype.extendSizeChildren = function (size, child_size) {
    // IMPLEMENT HERE!
    size.width += child_size.width;
    if (size.height < child_size.height) {
        size.height = child_size.height;
    }

    return size;
}

WebUI.Column.prototype.calcNextPosition = function (position, size) {
    // IMPLEMENT HERE!
    let next_left = position.left + size.width;
    let next_top = position.top;

    return {
        left: next_left,
        top: next_top
    };
}


//
WebUI.Row = function (properties) {
    WebUI.Widget.call(this, properties);

    this.type = WebUI.WidgetTypes.ROW;
}

WebUI.Row.prototype = Object.create(WebUI.Widget.prototype);
WebUI.Row.prototype.constructor = WebUI.Row;

WebUI.Row.prototype.extendSizeChildren = function (size, child_size) {
    // IMPLEMENT HERE!
    if (size.width < child_size.width) {
        size.width = child_size.width;
    }
    size.height += child_size.height;

    return size;

}

WebUI.Row.prototype.calcNextPosition = function (position, size) {
    // IMPLEMENT HERE!
    let next_left = position.left;
    let next_top = position.top + size.height;

    return {
        left: next_left,
        top: next_top
    };

}


// Text widget
WebUI.Text = function (label) {
    // COPY HERE!
    WebUI.Widget.call(this);

    this.type = WebUI.WidgetTypes.TEXT;
    this.label = label;

    this.font_family = 'System';
    this.font_size = 20;
    this.font_weight = '';
    this.text_align = 'left';
    this.text_color = 'white';
}

WebUI.Text.prototype = /* COPY HERE! */ Object.create(WebUI.Widget.prototype);;
WebUI.Text.prototype.constructor = /* COPY HERE! */ WebUI.Text;

WebUI.Text.prototype.initVisualItems = function () {
    // COPY HERE!
    let text = new fabric.Text(this.label, {
        left: this.position.left,
        top: this.position.top,
        selectable: false,
        fontFamily: this.font_family,
        fontSize: this.font_size,
        fontWeight: this.font_weight,
        textAlign: this.text_align,
        stroke: this.text_color,
        fill: this.text_color
    });

    let bound = text.getBoundingRect();
    this.position.left = bound.left;
    this.position.top = bound.top;
    this.size.width = bound.width;
    this.size.height = bound.height;

    this.visual_items.push(text);
    this.is_resource_ready = true;
}


// Image widget
WebUI.Image = function (path, desired_size) {
    WebUI.Widget.call(this);

    this.type = WebUI.WidgetTypes.IMAGE;
    this.path = path;
    this.desired_size = desired_size;
}

WebUI.Image.prototype = Object.create(WebUI.Widget.prototype);
WebUI.Image.prototype.constructor = WebUI.Image;

WebUI.Image.prototype.initVisualItems = function () {
    // COPY HERE!
    let widget = this;

    fabric.Image.fromURL(this.path, function (img) {
        if (widget.desired_size != undefined) {
            img.scaleToWidth(widget.desired_size.width);
            img.scaleToHeight(widget.desired_size.height);
            widget.size = widget.desired_size;
        } else {
            widget.size = {
                width: img.width,
                height: img.height
            };
        }
        img.set({
            left: widget.position.left,
            top: widget.position.top,
            selectable: false
        });

        widget.visual_items.push(img);
        widget.is_resource_ready = true;
    });
}


// PushButton widget
WebUI.PushButton = function (label, desired_size) {
    WebUI.Widget.call(this);

    this.type = WebUI.WidgetTypes.PUSH_BUTTON;
    this.label = label;
    this.desired_size = desired_size;
    this.is_pushed = false;

    this.stroke_color = 'black';
    this.fill_color = 'white';

    this.font_family = 'System';
    this.font_size = 20;
    this.font_weight = 'normal';
    this.text_align = 'center';
    this.text_color = 'black';
}

WebUI.PushButton.prototype = Object.create(WebUI.Widget.prototype);
WebUI.PushButton.prototype.constructor = WebUI.PushButton;

WebUI.PushButton.prototype.initVisualItems = function () {
    let background = new fabric.Rect({
        left: this.position.left,
        top: this.position.top,
        width: this.desired_size.width,
        height: this.desired_size.height,
        fill: this.fill_color,
        stroke: this.stroke_color,
        strokeWidth: 1,
        selectable: false
    });

    let text = new fabric.Text(this.label, {
        left: this.position.left,
        top: this.position.top,
        selectable: false,
        fontFamily: this.font_family,
        fontSize: this.font_size,
        fontWeight: this.font_weight,
        textAlign: this.text_align,
        stroke: this.text_color,
        fill: this.text_color,
    });

    let bound = text.getBoundingRect();
    text.left = this.position.left + this.desired_size.width / 2 - bound.width / 2;
    text.top = this.position.top + this.desired_size.height / 2 - bound.height / 2;

    this.size = this.desired_size;

    //
    this.visual_items.push(background);
    this.visual_items.push(text);
    this.is_resource_ready = true;
}

WebUI.PushButton.prototype.handleMouseDown = function () {
    // COPY HERE!
    if (!this.is_pushed) {
        this.translate({
            x: 0,
            y: 5
        });
        this.is_pushed = true;
        if (this.onPushed != undefined) {
            //this.onPushed.call(this);
        }
        return true;
    } else {
        return false;
    }
}

WebUI.PushButton.prototype.handleMouseUp = function () {
    // COPY HERE!
    if (this.is_pushed) {
        this.translate({
            x: 0,
            y: -5
        });
        this.is_pushed = false;
        return true;
    } else {
        return false;
    }
}

WebUI.PushButton.prototype.handleMouseEnter = function () {
    // COPY HERE!
    this.visual_items[0].set('strokeWidth', 1);
    return true;
}

WebUI.PushButton.prototype.handleMouseExit = function () {
    // COPY HERE!
    this.visual_items[0].set('strokeWidth', 1);
    if (this.is_pushed) {
        this.translate({
            x: 0,
            y: -5
        });
        this.is_pushed = false;
    }
    return true;
}


WebUI.parser = math.parser();
// CalcButton widget 추가
WebUI.CalcButton = function (label, desired_size, font_size, text_color, fill_color) {
    WebUI.Widget.call(this);

    this.type = WebUI.WidgetTypes.PUSH_BUTTON;
    this.label = label;
    this.desired_size = desired_size;
    this.is_pushed = false;

    this.stroke_color = '';
    this.fill_color = fill_color;

    this.font_family = 'System';
    this.font_size = font_size;
    this.font_weight = 'normal'
    this.text_align = 'center';
    this.text_color = text_color;

    this.onPushed = this.handleButtonPushed();
}

WebUI.CalcButton.prototype = Object.create(WebUI.PushButton.prototype);
WebUI.CalcButton.prototype.constructor = WebUI.CalcButton;

WebUI.CalcButton.prototype.handleMouseUp = function () {
    // COPY HERE!
    if (this.is_pushed) {
        this.translate({
            x: 0,
            y: -5
        });
        this.onPushed = this.handleButtonPushed(this.label);
        this.is_pushed = false;
        WebUI.widgets = [];
        WebUI.initialize();
        return true;
    } else {
        return false;
    }
}

WebUI.CalcButton.prototype.handleButtonPushed = function (e) {
    WebUI.res = WebUI.displayValue;
    if (this.is_pushed) {
        if (WebUI.displayValue == '0') {
            WebUI.displayValue = '';
        }

        if (this.label == 'EV') {
            try {
                savefun = WebUI.displayValue;
                if (cnt == 0) {
                    t1 += WebUI.displayValue + " ";
                    //cnt++;
                } else if (cnt == 1) {
                    t2 += WebUI.displayValue + " ";
                    //cnt++;
                } else if (cnt == 2) {
                    t3 += WebUI.displayValue + " ";
                    //cnt++;
                } else if (cnt == 3) {
                    t4 += WebUI.displayValue + " ";
                    //cnt++;
                } else if (cnt == 4) {
                    t5 += WebUI.displayValue + " ";
                }
                WebUI.displayValue = WebUI.parser.eval(WebUI.displayValue).toString();
                var tokens = WebUI.displayValue.split(' ');
                if (tokens[0] == 'function') {
                    var boo = savefun.split('(x)=');
                    WebUI.f = boo[1];
                    WebUI.displayValue = tokens[0];
                }
                if (cnt == 0) {
                    t1 += WebUI.displayValue + " ";
                    cnt++;
                } else if (cnt == 1) {
                    t2 += WebUI.displayValue + " ";
                    cnt++;
                } else if (cnt == 2) {
                    t3 += WebUI.displayValue + " ";
                    cnt++;
                } else if (cnt == 3) {
                    t4 += WebUI.displayValue + " ";
                    cnt++;
                } else if (cnt == 4) {
                    t1 = t2;
                    t2 = t3;
                    t3 = t4;
                    t5 += WebUI.displayValue + " ";
                    t4 = t5;
                    t5 = "";
                }
                WebUI.res = WebUI.displayValue;
                WebUI.displayValue = '0';
                this.is_pushed = false;
            } catch (e) {
                WebUI.displayValue = '0';
                if (WebUI.displayValue != 'function') {
                    WebUI.res = "ERROR!";
                }
                if (cnt == 0) {
                    t1 += WebUI.res + " ";
                    cnt++;
                } else if (cnt == 1) {
                    t2 += WebUI.res + " ";
                    cnt++;
                } else if (cnt == 2) {
                    t3 += WebUI.res + " ";
                    cnt++;
                } else if (cnt == 3) {
                    t4 += WebUI.res + " ";
                    cnt++;
                } else if (cnt == 4) {
                    t1 = t2;
                    t2 = t3;
                    t3 = t4;
                    t5 = WebUI.res;
                    t4 = t5;
                    t5 = "";
                }
                this.is_pushed = false;
            }
        } else {
            if (this.label == 'CL') {
                WebUI.displayValue = '0';
                WebUI.res = WebUI.displayValue;
                this.is_pushed = false;
            } else if (this.label == 'BACK') {
                WebUI.res = WebUI.res.slice(0, -1);
                WebUI.displayValue = WebUI.res;
                if (WebUI.res.length == 0) {
                    WebUI.res = null;
                    WebUI.res = '0';
                    WebUI.displayValue = '0';
                }
                this.is_pushed = false;
            } else {
                WebUI.displayValue += this.label;
                WebUI.res = WebUI.displayValue;
                this.is_pushed = false;
                WebUI.app = null;
            }
        }
        return this;
    }
    return false;
}
WebUI.CalcButton.prototype.handleMouseEnter = function () {
    // COPY HERE!
    this.visual_items[0].set('strokeWidth', 1);
    if (this.label == 'EV') {
        this.visual_items[0].set('fill', '#0470c5');
    } else if (this.label == 'BACK') {
        this.visual_items[0].set('fill', '#c50404');
    } else if (this.label == 'CL') {
        this.visual_items[0].set('fill', '#2caf2c');
    } else {
        this.visual_items[0].set('fill', '#707070');
    }
    return true;
}

WebUI.CalcButton.prototype.handleMouseExit = function () {
    // COPY HERE!
    this.visual_items[0].set('strokeWidth', 1);
    this.visual_items[0].set('fill', this.fill_color);
    if (this.is_pushed) {
        this.translate({
            x: 0,
            y: -5
        });
        this.is_pushed = false;
    }
    return true;
}

// TextField widget
WebUI.TextField = function (label, desired_size) {
    WebUI.Widget.call(this);

    this.type = WebUI.WidgetTypes.TEXT_FIELD;
    this.label = label;
    this.desired_size = desired_size;
    this.margin = 10;

    this.stroke_color = '#2c2c2c';
    this.fill_color = '#1c1c1c';
    this.stroke_width = 1;

    this.font_family = 'System';
    this.font_size = 20;
    this.font_weight = 'normal';
    this.text_align = 'left';
    this.text_color = 'white';
}

WebUI.TextField.prototype = Object.create(WebUI.Widget.prototype);
WebUI.TextField.prototype.constructor = WebUI.TextField;

WebUI.TextField.prototype.initVisualItems = function () {
    // COPY HERE!
    let boundary = new fabric.Rect({
        left: this.position.left,
        top: this.position.top,
        width: this.desired_size.width,
        height: this.desired_size.height,
        fill: this.fill_color,
        stroke: this.stroke_color,
        strokeWidth: this.stroke_width,
        selectable: false
    });

    let textbox = new fabric.Textbox(this.label, {
        left: this.position.left + this.margin,
        fontFamily: this.font_family,
        fontSize: this.font_size,
        fontWeight: this.font_weight,
        textAlign: this.text_align,
        stroke: this.text_color,
        fill: this.text_color,
        selectable: false
    });

    let bound = textbox.getBoundingRect();
    textbox.top = this.position.top + (this.desired_size.height - bound.height) / 2;

    this.size = this.desired_size;

    this.visual_items.push(boundary);
    this.visual_items.push(textbox);

    this.is_resource_ready = true;
}

WebUI.TextField.prototype.handleMouseDown = function (canvas_p) {
    let textbox = this.visual_items[1];
    textbox.enterEditing();

    return true;
}

WebUI.TextField.prototype.handleKeyPress = function (event) {
    let boundary = this.visual_items[0];
    let textbox = this.visual_items[1];

    let new_label = textbox.text;
    let old_label = this.label;
    this.label = new_label;

    if (event.keyCode == 13) {
        let text_enter_removed = new_label.replace(/(\r\n|\n|\r)/gm, "");
        textbox.text = text_enter_removed;
        this.label = text_enter_removed;

        if (textbox.hiddenTextarea != null) {
            textbox.hiddenTextarea.value = text_enter_removed;
        }

        textbox.exitEditing();

        return true;
    }

    if (old_label != new_label && old_label.length < new_label.length) {
        let canvas = document.getElementById("c");
        let context = canvas.getContext("2d");
        context.font = this.font_size.toString() + "px " + this.font_family;

        let boundary_right = boundary.left + boundary.width - this.margin;
        let text_bound = textbox.getBoundingRect();
        let text_width = context.measureText(new_label).width;
        let text_right = text_bound.left + text_width;

        if (boundary_right < text_right) {
            textbox.text = old_label;
            this.label = old_label;

            if (textbox.hiddenTextarea != null) {
                textbox.hiddenTextarea.value = old_label;
            }

            return true;
        }
    }

    return false;
}


// Switch widget
WebUI.Switch = function (is_on, desired_size) {
    // COPY HERE!
    WebUI.Widget.call(this);

    this.type = WebUI.WidgetTypes.SWITCH;
    this.is_on = is_on;
    this.desired_size = desired_size;
}

WebUI.Switch.prototype = Object.create(WebUI.Widget.prototype);
WebUI.Switch.prototype.constructor = WebUI.Switch;

WebUI.Switch.prototype.initVisualItems = function () {
    // IMPLEMENT HERE!
    let left_circle = new fabric.Circle({
        left: this.position.left,
        top: this.position.top,
        radius: this.desired_size.width / 4,
        fill: 'rgb(142,142,147)',
        strokeWidth: 1,
        selectable: false
    });
    let right_circle = new fabric.Circle({
        left: this.position.left + this.desired_size.width / 2,
        top: this.position.top,
        radius: this.desired_size.width / 4,
        fill: 'rgb(142,142,147)',
        strokeWidth: 1,
        selectable: false
    });
    let center = new fabric.Rect({
        left: this.position.left + this.desired_size.width / 4,
        top: this.position.top,
        width: this.desired_size.width / 2,
        height: this.desired_size.width / 2,
        fill: 'rgb(142,142,147)',
        strokeWidth: 1,
        selectable: false
    });
    let center_circle = new fabric.Circle({
        left: this.desired_size.width / 4 * 0.1,
        top: this.desired_size.width / 4 * 0.1,
        radius: this.desired_size.width / 4 * 0.9,
        fill: 'rgb(255,255,255)',
        stroke: 'rgb(142,142,147)',
        strokeWidth: 1,
        selectable: false
    });
    this.size = this.desired_size;

    this.visual_items.push(left_circle);
    this.visual_items.push(right_circle);
    this.visual_items.push(center);
    this.visual_items.push(center_circle);
    this.is_resource_ready = true;
}

WebUI.Switch.prototype.handleMouseDown = function () {
    // IMPLEMENT HERE!
    if (!this.is_on) {
        this.visual_items[0].set('fill', 'rgb(48,209,88)');
        this.visual_items[1].set('fill', 'rgb(48,209,88)');
        this.visual_items[2].set('fill', 'rgb(48,209,88)');
        this.visual_items[3].animate('left', this.position.left + this.desired_size.width / 4 * 2.1, {
            duration: 100,
            onChange: WebUI.canvas.renderAll.bind(WebUI.canvas),
            easing: fabric.util.ease.easeInOutCubic,
        });
        this.visual_items[3].set('stroke', 'rgb(48,209,88)');
        this.is_on = true;
    } else {
        this.visual_items[0].set('fill', 'rgb(142,142,147)');
        this.visual_items[1].set('fill', 'rgb(142,142,147)');
        this.visual_items[2].set('fill', 'rgb(142,142,147)');
        this.visual_items[3].animate('left', this.position.left + this.desired_size.width / 4 * 0.1, {
            duration: 100,
            onChange: WebUI.canvas.renderAll.bind(WebUI.canvas),
            easing: fabric.util.ease.easeInOutCubic,
        });
        this.visual_items[3].set('stroke', 'rgb(142,142,147)');
        this.is_on = false;
    }
    return true;
}


//
WebUI.f = null;

// Graph widget
WebUI.GraphPlot = function (desired_size) {
    WebUI.Widget.call(this);
    this.type = WebUI.WidgetTypes.GRAPHPLOT;
    this.desired_size = desired_size;
    this.margin = 10;

    this.stroke_color = '#2c2c2c';
    this.fill_color = '#1c1c1c';
    this.stroke_width = 1;

    this.font_family = 'System';
    this.font_size = 20;
    this.font_weight = 'normal';
    this.text_align = 'left';
    this.text_color = 'white';
}
WebUI.GraphPlot.prototype = Object.create(WebUI.Widget.prototype);
WebUI.GraphPlot.prototype.constructor = WebUI.GraphPlot;

WebUI.GraphPlot.prototype.initVisualItems = function () {
    let bd = new fabric.Rect({
        left: this.position.left,
        top: this.position.top,
        width: this.desired_size.width,
        height: this.desired_size.height,
        fill: this.fill_color,
        stroke: this.stroke_color,
        strokeWidth: this.stroke_width,
        selectable: false
    });
    this.size = this.desired_size;
    this.visual_items.push(bd);
    this.is_resource_ready = true;
}
WebUI.GraphPlot.prototype.draww = function () {
}
WebUI.GraphPlot.prototype.Line = function () {
}
WebUI.GraphPlot.prototype.Graph = function () {
}

var parameters = {
    target: '#d',
    data: [{
      fn: 'cos(x)',
      color: 'red'
    }],
    grid: true,
    yAxis: {
      domain: [-1, 1]
    },
    xAxis: {
      domain: [0, 2 * Math.PI]
    }
  };

  function plot() {
    var f = WebUI.f;
    var xMin = -10;
    var xMax = 10;
    var yMin = -10;
    var yMax = 10;
    var color = 'rgb(255,0,0)';

    parameters.data[0].fn = f;
    parameters.xAxis.domain = [xMin, xMax];
    parameters.yAxis.domain = [yMin, yMax];
    parameters.data[0].color = color;

    functionPlot(parameters);
  }



WebUI.Report = function (text1, text2, text3, text4, desired_size) {
    WebUI.Widget.call(this);

    this.type = WebUI.WidgetTypes.REPORT;
    //this.label = label;
    this.desired_size = desired_size;
    this.margin = 10;

    this.stroke_color = '#2c2c2c';
    this.fill_color = '#1c1c1c';
    this.stroke_width = 1;

    this.font_family = 'System';
    this.font_size = 20;
    this.font_weight = 'normal';
    this.text_align = 'left';
    this.text_color = 'white';

    this.t1 = text1;
    this.t2 = text2;
    this.t3 = text3;
    this.t4 = text4;
}

let t1 = "";
let t2 = "";
let t3 = "";
let t4 = "";
let t5 = "";

WebUI.Report.prototype = Object.create(WebUI.Widget.prototype);
WebUI.Report.prototype.constructor = WebUI.Report;

WebUI.Report.prototype.initVisualItems = function () {
    let bd = new fabric.Rect({
        left: this.position.left,
        top: this.position.top,
        width: this.desired_size.width,
        height: this.desired_size.height,
        fill: this.fill_color,
        stroke: this.stroke_color,
        strokeWidth: this.stroke_width,
        selectable: false
    });
    let tt1 = new fabric.Text(this.t1, {
        left: this.position.left + 10,
        top: this.position.top + 8,
        selectable: false,
        fontFamily: this.font_family,
        fontSize: this.font_size,
        fontWeight: this.font_weight,
        textAlign: this.text_align,
        stroke: this.text_color,
        fill: this.text_color
    });
    let tt2 = new fabric.Text(this.t2, {
        left: this.position.left + 10,
        top: this.position.top + 50,
        selectable: false,
        fontFamily: this.font_family,
        fontSize: this.font_size,
        fontWeight: this.font_weight,
        textAlign: this.text_align,
        stroke: this.text_color,
        fill: this.text_color
    });
    let tt3 = new fabric.Text(this.t3, {
        left: this.position.left + 10,
        top: this.position.top + 92,
        selectable: false,
        fontFamily: this.font_family,
        fontSize: this.font_size,
        fontWeight: this.font_weight,
        textAlign: this.text_align,
        stroke: this.text_color,
        fill: this.text_color
    });
    let tt4 = new fabric.Text(this.t4, {
        left: this.position.left + 10,
        top: this.position.top + 134,
        selectable: false,
        fontFamily: this.font_family,
        fontSize: this.font_size,
        fontWeight: this.font_weight,
        textAlign: this.text_align,
        stroke: this.text_color,
        fill: this.text_color
    });
    this.size = this.desired_size;

    this.visual_items.push(bd);
    this.visual_items.push(tt1);
    this.visual_items.push(tt2);
    this.visual_items.push(tt3);
    this.visual_items.push(tt4);

    this.is_resource_ready = true;
}

$(document).ready(function () {
    WebUI.initialize();
});