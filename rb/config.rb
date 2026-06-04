# Unshortenme SDK configuration

module UnshortenmeConfig
  def self.make_config
    {
      "main" => {
        "name" => "Unshortenme",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://unshorten.me/api/v2",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "unshorten" => {},
        },
      },
      "entity" => {
        "unshorten" => {
          "fields" => [
            {
              "name" => "shortened_url",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "success",
              "req" => true,
              "type" => "`$BOOLEAN`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "unshortened_url",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
          ],
          "name" => "unshorten",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "https://bit.ly/3DKWm5t",
                        "kind" => "query",
                        "name" => "url",
                        "orig" => "url",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/unshorten",
                  "parts" => [
                    "unshorten",
                  ],
                  "select" => {
                    "exist" => [
                      "url",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    UnshortenmeFeatures.make_feature(name)
  end
end
