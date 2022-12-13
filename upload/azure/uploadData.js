"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cosmos_1 = require("@azure/cosmos");
var azureCosmosdb_1 = require("./azureCosmosdb");
var promises_1 = require("fs/promises");
var constants_1 = require("../shared/constants");
function uploadData() {
    return __awaiter(this, void 0, void 0, function () {
        var container, dataFromFile, _a, _b, questions, batchSize, i, begin, end, questionsBatch, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, azureCosmosdb_1.createNewDatabaseAndContainer)()];
                case 1:
                    container = _c.sent();
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, (0, promises_1.readFile)("./trivia.json", "utf-8")];
                case 2:
                    dataFromFile = _b.apply(_a, [_c.sent()]);
                    questions = dataFromFile.map(function (q) { return ({ operationType: cosmos_1.BulkOperationType.Create, resourceBody: q }); });
                    console.log("Data length = ".concat(questions.length));
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 8, , 9]);
                    batchSize = constants_1.CONSTANTS.MAX_ITEMS_BATCH_UPLOAD;
                    i = 0;
                    _c.label = 4;
                case 4:
                    if (!(i < batchSize)) return [3 /*break*/, 7];
                    begin = i * batchSize;
                    end = begin + batchSize;
                    questionsBatch = questions.slice(begin, end);
                    console.log("[".concat(i, "]: batch items (").concat(questionsBatch.length, ") (batch size: ").concat(batchSize, "): ").concat(JSON.stringify(questionsBatch)));
                    // Upload data to Cosmos DB NoSql container
                    return [4 /*yield*/, container.items.bulk(questionsBatch)];
                case 5:
                    // Upload data to Cosmos DB NoSql container
                    _c.sent();
                    _c.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 4];
                case 7:
                    console.log("All questions imported");
                    return [3 /*break*/, 9];
                case 8:
                    e_1 = _c.sent();
                    console.error(e_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
uploadData();
