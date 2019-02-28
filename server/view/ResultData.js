"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResultData = /** @class */ (function () {
    function ResultData(resultCode, resultMsg, resultData) {
        this.resultCode = resultCode || '0';
        this.resultMsg = resultMsg || '成功';
        this.resultData = resultData;
    }
    return ResultData;
}());
exports.default = ResultData;
//# sourceMappingURL=ResultData.js.map