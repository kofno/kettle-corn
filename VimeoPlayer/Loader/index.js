"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskarian_1 = require("taskarian");
var loadVimeo = new taskarian_1.default(function (reject, resolve) {
    if (typeof Vimeo !== 'undefined' && typeof Vimeo.Player !== 'undefined') {
        resolve(undefined);
    }
    else {
        var uri = '//player.vimeo.com/api/player.js';
        var script = document.createElement('script');
        script.src = uri;
        script.type = 'text/javascript';
        script.onload = function () {
            resolve(undefined);
        };
        document.head.appendChild(script);
    }
    return function () {
        console.warn('Loading Vimeo API cannot be cancelled');
    };
});
exports.default = loadVimeo;
//# sourceMappingURL=index.js.map