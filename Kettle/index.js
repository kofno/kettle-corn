"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var Messages_1 = require("./Messages");
var VideoState_1 = require("./VideoState");
var maybeasy_1 = require("maybeasy");
/**
 * The Kettle holds the video state. State is made observable by MobX.
 * Messages can also be sent to an observing video player using the
 * Kettle
 *
 *     const kettle = new Kettle();
 *     kettle.seekTo(30);
 *
 */
var Kettle = (function () {
    function Kettle() {
        /** Current state of the Video */
        this.videoState = new VideoState_1.Initialized();
        /** Messages to send to the embedded player */
        this.videoMessage = [];
    }
    Kettle.prototype.setVideoState = function (state) {
        this.videoState = state;
    };
    Kettle.prototype.sendMessage = function (msg) {
        this.videoMessage.push(msg);
    };
    Kettle.prototype.popMessage = function () {
        return maybeasy_1.fromNullable(this.videoMessage.pop());
    };
    Kettle.prototype.seekTo = function (time) {
        this.sendMessage(new Messages_1.SeekTo(time));
    };
    Kettle.prototype.play = function () {
        this.sendMessage(new Messages_1.Play());
    };
    Kettle.prototype.pause = function () {
        this.sendMessage(new Messages_1.Pause());
    };
    __decorate([
        mobx_1.observable
    ], Kettle.prototype, "videoState", void 0);
    __decorate([
        mobx_1.observable
    ], Kettle.prototype, "videoMessage", void 0);
    __decorate([
        mobx_1.action
    ], Kettle.prototype, "setVideoState", null);
    __decorate([
        mobx_1.action
    ], Kettle.prototype, "sendMessage", null);
    __decorate([
        mobx_1.action
    ], Kettle.prototype, "popMessage", null);
    __decorate([
        mobx_1.action
    ], Kettle.prototype, "seekTo", null);
    __decorate([
        mobx_1.action
    ], Kettle.prototype, "play", null);
    __decorate([
        mobx_1.action
    ], Kettle.prototype, "pause", null);
    return Kettle;
}());
exports.default = Kettle;
//# sourceMappingURL=index.js.map