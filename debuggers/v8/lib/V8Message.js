/**
 * Ajax.org Code Editor (ACE)
 *
 * @copyright 2010, Ajax.org Services B.V.
 * @author Fabian Jakobs <fabian AT ajax DOT org>
 */


define(function(require, exports, module) {
"use strict";

var Util = require("./util");

var V8Message = module.exports = function(type) {
    this.seq = V8Message.$seq++;
    this.type = type;
};

(function() {

    this.$msgKeys = [
        "seq",
        "type",
        "command",
        "arguments",
        "request_seq",
        "body",
        "running",
        "success",
        "message",
        "event",
        "runner"
    ];
    var len = this.$msgKeys.length;

    this.parse = function(msgString) {
        var json = JSON.parse(msgString);
        Util.mixin(this, json);
        return this;
    };

    this.stringify = function() {
        var tmp = {};
        for (var i = 0; i < len; i++) {
            var name = this.$msgKeys[i];
            if (typeof this[name] != "undefined")
                tmp[name] = this[name];
        }
        // TODO is there a better place for this
        if (tmp.arguments && !tmp.arguments.maxStringLength)
            tmp.arguments.maxStringLength = 10000;
        return JSON.stringify(tmp);
    };

}).call(V8Message.prototype);

V8Message.$seq = 1;

V8Message.fromString = function(msgString) {
    return new V8Message().parse(msgString);
};

V8Message.fromObject = function(obj) {
    var msg = new V8Message();
    Util.mixin(msg, obj);
    return msg;
};

});