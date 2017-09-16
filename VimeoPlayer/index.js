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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var VideoState_1 = require("./../Kettle/VideoState");
var maybeasy_1 = require("maybeasy");
var Loader_1 = require("./Loader");
var currentPos = function (player) {
    return player.getCurrentTime().then(maybeasy_1.just);
};
var currentDuration = function (player) {
    return player.getDuration().then(function (dur) { return (dur > 0 ? maybeasy_1.just(dur) : maybeasy_1.nothing()); });
};
var VimeoPlayer = (function (_super) {
    __extends(VimeoPlayer, _super);
    function VimeoPlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.registerKettleReactions = function (player) {
            var kettle = _this.props.kettle;
            mobx_1.reaction(function () { return kettle.videoMessage.length; }, function (_length) {
                kettle.popMessage().map(function (msg) {
                    return msg.cata({
                        play: function () {
                            player.play();
                        },
                        pause: function () {
                            player.pause();
                        },
                        seekTo: function (pos) {
                            player.setCurrentTime(pos);
                        },
                    });
                });
            });
        };
        _this.updateKettle = function (player, fn) {
            var kettle = _this.props.kettle;
            // prettier-ignore
            currentPos(player)
                .then(function (pos) { return currentDuration(player)
                .then(function (dur) { return kettle.setVideoState(fn(pos, dur)); }); });
        };
        _this.ready = function (player) { return _this.updateKettle(player, function (pos, dur) { return new VideoState_1.Ready(pos, dur); }); };
        _this.handlePlay = function (player) { return function () {
            return _this.updateKettle(player, function (pos, dur) { return new VideoState_1.Playing(pos, dur); });
        }; };
        _this.handlePause = function (player) { return function () {
            return _this.updateKettle(player, function (pos, dur) { return new VideoState_1.Paused(pos, dur); });
        }; };
        _this.handleEnd = function (player) { return function () {
            return _this.updateKettle(player, function (pos, dur) { return new VideoState_1.Ended(pos, dur); });
        }; };
        _this.handleTime = function (player) { return function () {
            var kettle = _this.props.kettle;
            _this.updateKettle(player, function (pos, dur) {
                return kettle.videoState.cata({
                    playing: function () { return new VideoState_1.Playing(pos, dur); },
                    paused: function () { return new VideoState_1.Paused(pos, dur); },
                    ended: function () { return new VideoState_1.Ended(pos, dur); },
                    buffering: function () { return new VideoState_1.Buffering(pos, dur); },
                    ready: function () { return new VideoState_1.Ready(pos, dur); },
                    initialized: function () { return new VideoState_1.Initialized(); },
                });
            });
        }; };
        _this.refContainer = function (container) {
            _this.container = container;
        };
        return _this;
    }
    VimeoPlayer.prototype.componentDidMount = function () {
        var _this = this;
        var videoId = this.props.videoId;
        Loader_1.default.fork(function (err) { return console.warn(err); }, function () {
            if (!_this.container)
                return;
            var player = new Vimeo.Player(_this.container, { id: videoId });
            player.ready().then(function () {
                _this.registerKettleReactions(player);
                _this.ready(player);
                player.on('play', _this.handlePlay(player));
                player.on('pause', _this.handlePause(player));
                player.on('timeupdate', _this.handleTime(player));
                player.on('seeked', _this.handleTime(player));
                player.on('ended', _this.handleEnd(player));
            });
        });
    };
    VimeoPlayer.prototype.componentWillUnmount = function () {
        if (typeof this.player === 'undefined')
            return;
        this.player.off('play');
        this.player.off('pause');
        this.player.off('timeupdate');
        this.player.off('seeked');
        this.player.off('ended');
        this.player.unload();
        this.player = undefined;
    };
    VimeoPlayer.prototype.render = function () {
        var _a = this.props, id = _a.id, className = _a.className;
        return (React.createElement("span", null,
            React.createElement("div", { id: id, className: className, ref: this.refContainer })));
    };
    VimeoPlayer = __decorate([
        mobx_react_1.observer
    ], VimeoPlayer);
    return VimeoPlayer;
}(React.Component));
exports.default = VimeoPlayer;
//# sourceMappingURL=index.js.map