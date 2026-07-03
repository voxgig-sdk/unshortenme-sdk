-- ProjectName SDK configuration

local function make_config()
  return {
    main = {
      name = "Unshortenme",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://unshorten.me/api/v2",
      auth = {
        prefix = "Bearer",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["unshorten"] = {},
      },
    },
    entity = {
      ["unshorten"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "shortened_url",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "success",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "unshortened_url",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
        },
        ["name"] = "unshorten",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = "https://bit.ly/3DKWm5t",
                      ["kind"] = "query",
                      ["name"] = "url",
                      ["orig"] = "url",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/unshorten",
                ["parts"] = {
                  "unshorten",
                },
                ["select"] = {
                  ["exist"] = {
                    "url",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
