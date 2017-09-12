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
var maybeasy_1 = require("maybeasy");
var VideoState = /** @class */ (function () {
    function VideoState(position, duration) {
        this.position = position;
        this.duration = duration;
    }
    Object.defineProperty(VideoState.prototype, "timings", {
        get: function () {
            return {
                position: this.position,
                duration: this.duration,
            };
        },
        enumerable: true,
        configurable: true
    });
    return VideoState;
}());
exports.VideoState = VideoState;
var Initialized = /** @class */ (function (_super) {
    __extends(Initialized, _super);
    function Initialized() {
        return _super.call(this, maybeasy_1.nothing(), maybeasy_1.nothing()) || this;
    }
    Initialized.prototype.cata = function (fold) {
        return fold.initialized();
    };
    return Initialized;
}(VideoState));
exports.Initialized = Initialized;
var Ready = /** @class */ (function (_super) {
    __extends(Ready, _super);
    function Ready() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Ready.prototype.cata = function (fold) {
        return fold.ready(this.timings);
    };
    return Ready;
}(VideoState));
exports.Ready = Ready;
var Playing = /** @class */ (function (_super) {
    __extends(Playing, _super);
    function Playing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Playing.prototype.cata = function (fold) {
        return fold.playing(this.timings);
    };
    return Playing;
}(VideoState));
exports.Playing = Playing;
var Paused = /** @class */ (function (_super) {
    __extends(Paused, _super);
    function Paused() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Paused.prototype.cata = function (fold) {
        return fold.paused(this.timings);
    };
    return Paused;
}(VideoState));
exports.Paused = Paused;
var Ended = /** @class */ (function (_super) {
    __extends(Ended, _super);
    function Ended() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Ended.prototype.cata = function (fold) {
        return fold.ended(this.timings);
    };
    return Ended;
}(VideoState));
exports.Ended = Ended;
var Buffering = /** @class */ (function (_super) {
    __extends(Buffering, _super);
    function Buffering() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Buffering.prototype.cata = function (fold) {
        return fold.buffering(this.timings);
    };
    return Buffering;
}(VideoState));
exports.Buffering = Buffering;
//# sourceMappingURL=VideoState.js.map