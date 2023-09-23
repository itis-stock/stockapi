"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getboolean(b) {
    if (b === 'true')
        return true;
    else if (b === 'false')
        return false;
    else
        return null;
}
exports.default = getboolean;
