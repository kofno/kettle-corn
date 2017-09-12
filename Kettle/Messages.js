"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var VideoMessage = /** @class */ (function () {
    function VideoMessage() {
    }
    return VideoMessage;
}());
exports.VideoMessage = VideoMessage;
var Play = /** @class */ (function (_super) {
    __extends(Play, _super);
    function Play() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Play.prototype.cata = function (fold) {
        return fold.play();
    };
    return Play;
}(VideoMessage));
exports.Play = Play;
var Pause = /** @class */ (function (_super) {
    __extends(Pause, _super);
    function Pause() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pause.prototype.cata = function (fold) {
        return fold.pause();
    };
    return Pause;
}(VideoMessage));
exports.Pause = Pause;
var SeekTo = /** @class */ (function (_super) {
    __extends(SeekTo, _super);
    function SeekTo(position) {
        var _this = _super.call(this) || this;
        _this.position = position;
        return _this;
    }
    SeekTo.prototype.cata = function (fold) {
        return fold.seekTo(this.position);
    };
    return SeekTo;
}(VideoMessage));
exports.SeekTo = SeekTo;
//# sourceMappingURL=Messages.js.map