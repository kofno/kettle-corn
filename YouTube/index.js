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
var maybeasy_1 = require("maybeasy");
var Loader_1 = require("./Loader");
var VideoState_1 = require("./../Kettle/VideoState");
/**
 * YouTube component for embedding a YouVideo in a page. Compatible with a
 * MobX Kettle.
 */
var YouTube = (function (_super) {
    __extends(YouTube, _super);
    function YouTube() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Maps YouTube states to a Kettle VideoStata
         */
        _this.mapState = function (state, position, duration) {
            switch (state) {
                case YT.PlayerState.BUFFERING:
                    return new VideoState_1.Buffering(maybeasy_1.just(position), duration);
                case YT.PlayerState.CUED:
                    return new VideoState_1.Ready(maybeasy_1.just(position), duration);
                case YT.PlayerState.ENDED:
                    return new VideoState_1.Ended(maybeasy_1.just(position), duration);
                case YT.PlayerState.PAUSED:
                    return new VideoState_1.Paused(maybeasy_1.just(position), duration);
                case YT.PlayerState.PLAYING:
                    return new VideoState_1.Playing(maybeasy_1.just(position), duration);
                case YT.PlayerState.UNSTARTED:
                    return new VideoState_1.Initialized();
            }
        };
        /**
         * Updates the state of the Kettle from the state of the player
         */
        _this.updateKettle = function (player) {
            var kettle = _this.props.kettle;
            var state = player.getPlayerState();
            var time = player.getCurrentTime();
            var d = player.getDuration();
            var duration = d === 0 ? maybeasy_1.nothing() : maybeasy_1.just(d);
            return kettle.setVideoState(_this.mapState(state, time, duration));
        };
        /**
         * Register an observer that watchers for when messages are sent through the
         * Kettle to this component.
         */
        _this.registerKettleReactions = function (kettle, player) {
            mobx_1.reaction(function () { return kettle.videoMessage.length; }, function (_length) {
                kettle.popMessage().map(function (msg) {
                    msg.cata({
                        play: function () { return player.playVideo(); },
                        pause: function () { return player.pauseVideo(); },
                        seekTo: function (pos) { return player.seekTo(pos, true); },
                    });
                });
            });
        };
        _this.refContainer = function (container) {
            _this.container = container;
        };
        return _this;
    }
    YouTube.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, videoId = _a.videoId, kettle = _a.kettle;
        Loader_1.default.fork(function (err) { return console.warn(err); }, function () {
            if (!_this.container)
                return;
            var player = new YT.Player(_this.container, {
                videoId: videoId,
                playerVars: {
                    enablejsapi: 1 /* Enable */,
                },
            });
            player.addEventListener('onReady', function (_a) {
                var target = _a.target;
                _this.registerKettleReactions(kettle, target);
                _this.updateKettle(target);
                // YouTube doesn't fire continual updates while playing or scrubbing
                setInterval(function () {
                    _this.updateKettle(target);
                }, 250);
            });
            player.addEventListener('onStateChange', function (_a) {
                var target = _a.target;
                return _this.updateKettle(target);
            });
        });
    };
    YouTube.prototype.render = function () {
        var _a = this.props, id = _a.id, className = _a.className;
        return (React.createElement("span", null,
            React.createElement("div", { id: id, className: className, ref: this.refContainer })));
    };
    YouTube = __decorate([
        mobx_react_1.observer
    ], YouTube);
    return YouTube;
}(React.Component));
exports.default = YouTube;
//# sourceMappingURL=index.js.map