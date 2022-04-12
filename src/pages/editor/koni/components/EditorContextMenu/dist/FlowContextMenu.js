"use strict";
exports.__esModule = true;
var gg_editor_1 = require("gg-editor");
var MenuItem_1 = require("./MenuItem");
var index_less_1 = require("./index.less");
var FlowContextMenu = function () { return (React.createElement(gg_editor_1.ContextMenu, { className: index_less_1["default"].contextMenu },
    React.createElement(gg_editor_1.NodeMenu, null,
        React.createElement(MenuItem_1["default"], { command: "copy" }),
        React.createElement(MenuItem_1["default"], { command: "delete" })),
    React.createElement(gg_editor_1.EdgeMenu, null,
        React.createElement(MenuItem_1["default"], { command: "delete" })),
    React.createElement(gg_editor_1.GroupMenu, null,
        React.createElement(MenuItem_1["default"], { command: "copy" }),
        React.createElement(MenuItem_1["default"], { command: "delete" }),
        React.createElement(MenuItem_1["default"], { command: "unGroup", icon: "ungroup", text: "Ungroup" })),
    React.createElement(gg_editor_1.MultiMenu, null,
        React.createElement(MenuItem_1["default"], { command: "copy" }),
        React.createElement(MenuItem_1["default"], { command: "paste" }),
        React.createElement(MenuItem_1["default"], { command: "addGroup", icon: "group", text: "Add Group" }),
        React.createElement(MenuItem_1["default"], { command: "delete" })),
    React.createElement(gg_editor_1.CanvasMenu, null,
        React.createElement(MenuItem_1["default"], { command: "undo" }),
        React.createElement(MenuItem_1["default"], { command: "redo" }),
        React.createElement(MenuItem_1["default"], { command: "pasteHere", icon: "paste", text: "Paste Here" })))); };
exports["default"] = FlowContextMenu;
