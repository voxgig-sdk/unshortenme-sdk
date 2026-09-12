"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Unshortenme',
        slug: "unshortenme",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://unshorten.me/api/v2",
        auth: {
            prefix: '',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            unshorten: {},
        }
    };
    entity = {
        "unshorten": {
            "fields": [
                {
                    "format": "uri",
                    "name": "shortened_url",
                    "req": true,
                    "short": "The original shortened URL that was provided",
                    "type": "`$STRING`"
                },
                {
                    "name": "success",
                    "req": true,
                    "short": "Indicates whether the unshortening operation was successful",
                    "type": "`$BOOLEAN`"
                },
                {
                    "format": "uri",
                    "name": "unshortened_url",
                    "req": true,
                    "short": "The full unshortened URL",
                    "type": "`$STRING`"
                }
            ],
            "name": "unshorten",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "https://bit.ly/3DKWm5t",
                                        "kind": "query",
                                        "name": "url",
                                        "orig": "url",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/unshorten",
                            "segments": [
                                {
                                    "lit": "unshorten"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "url"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "unshorten"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map