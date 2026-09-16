"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('UnshortenEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when UNSHORTENME_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('UNSHORTENME_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.UnshortenmeSDK.test();
        const ent = testsdk.Unshorten();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.UNSHORTENME_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'unshorten.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "uri", "name": "shortened_url", "req": true, "short": "The original shortened URL that was provided", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "success", "req": true, "short": "Indicates whether the unshortening operation was successful", "type": "`$BOOLEAN`", "index$": 1 }, { "active": true, "format": "uri", "name": "unshortened_url", "req": true, "short": "The full unshortened URL", "type": "`$STRING`", "index$": 2 }], "name": "unshorten", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "https://bit.ly/3DKWm5t", "kind": "query", "name": "url", "orig": "url", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /unshorten", "json": "{\"operationId\":\"unshortenUrl\",\"parameters\":[{\"description\":\"The shortened URL to be unshortened\",\"in\":\"query\",\"name\":\"url\",\"required\":true,\"schema\":{\"example\":\"https://bit.ly/3DKWm5t\",\"format\":\"uri\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"successfulUnshorten\":{\"summary\":\"Successful unshorten response\",\"value\":{\"shortened_url\":\"https://bit.ly/3DKWm5t\",\"success\":true,\"unshortened_url\":\"https://www.youtube.com/\"}}},\"schema\":{\"properties\":{\"shortened_url\":{\"description\":\"The original shortened URL that was provided\",\"example\":\"https://bit.ly/3DKWm5t\",\"format\":\"uri\",\"type\":\"string\"},\"success\":{\"description\":\"Indicates whether the unshortening operation was successful\",\"example\":true,\"type\":\"boolean\"},\"unshortened_url\":{\"description\":\"The full unshortened URL\",\"example\":\"https://www.youtube.com/\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"unshortened_url\",\"shortened_url\",\"success\"],\"type\":\"object\"}}},\"description\":\"Successfully unshortened the URL\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Invalid URL parameter\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid URL parameter\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Invalid or missing authorization token\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - invalid or missing authorization token\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Rate limit exceeded. Please upgrade your subscription or contact us.\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"An error occurred while processing your request\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"TokenAuth\":[]}],\"securitySchemes\":{\"TokenAuth\":{\"description\":\"Token-based authentication. Use the format: 'Token {your_token}' where the token can be found in your profile page.\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/unshorten", "segments": [{ "lit": "unshorten" }], "select": { "exist": ["url"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "unshorten", "name__orig": "unshorten", "Name": "Unshorten", "name_": "unshorten", "name-": "unshorten", "NAME": "UNSHORTEN", "index$": 0 }, { "active": true, "entity": "unshorten", "key$": "BasicUnshortenFlow", "kind": "basic", "name": "BasicUnshortenFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "unshorten_ref01", "srcdatavar": "unshorten_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-unshorten_ref01" } }], "index$": 0 }] }, 'Unshorten');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let unshorten_ref01_data = Object.values(setup.data.existing.unshorten)[0];
        // LOAD
        const unshorten_ref01_ent = client.Unshorten();
        const unshorten_ref01_match_dt0 = {};
        const unshorten_ref01_data_dt0 = (await unshorten_ref01_ent.load(unshorten_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != unshorten_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/unshorten/UnshortenTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.UnshortenmeSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['unshorten01', 'unshorten02', 'unshorten03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'UNSHORTENME_TEST_UNSHORTEN_ENTID': idmap,
        'UNSHORTENME_TEST_LIVE': 'FALSE',
        'UNSHORTENME_TEST_EXPLAIN': 'FALSE',
        'UNSHORTENME_APIKEY': '',
    });
    idmap = env['UNSHORTENME_TEST_UNSHORTEN_ENTID'];
    const live = 'TRUE' === env.UNSHORTENME_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['UNSHORTENME_TEST_UNSHORTEN_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.UnshortenmeSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.UNSHORTENME_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.UNSHORTENME_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=UnshortenEntity.test.js.map