"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskarian_1 = require("taskarian");
var loadYouTube = new taskarian_1.default(function (rejct, resolve) {
    window.onYouTubeIframeAPIReady = function () { return resolve(undefined); };
    if (typeof YT !== 'undefined' && typeof YT.Player !== 'undefined') {
        resolve(undefined);
    }
    else {
        var uri = '//www.youtube.com/iframe_api';
        var script = document.createElement('script');
        script.src = uri;
        script.type = 'text/javascript';
        document.head.appendChild(script);
    }
    return function () {
        console.warn('Loading YouTube Iframe Api cannot be cancelled');
    };
});
exports.default = loadYouTube;
//# sourceMappingURL=index.js.map