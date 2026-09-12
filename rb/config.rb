# Unshortenme SDK configuration

module UnshortenmeConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Unshortenme",
        "slug" => "unshortenme",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://unshorten.me/api/v2",
        "auth" => {
          "prefix" => "",
        },
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
              "format" => "uri",
              "name" => "shortened_url",
              "req" => true,
              "short" => "The original shortened URL that was provided",
              "type" => "`$STRING`",
            },
            {
              "name" => "success",
              "req" => true,
              "short" => "Indicates whether the unshortening operation was successful",
              "type" => "`$BOOLEAN`",
            },
            {
              "format" => "uri",
              "name" => "unshortened_url",
              "req" => true,
              "short" => "The full unshortened URL",
              "type" => "`$STRING`",
            },
          ],
          "name" => "unshorten",
          "op" => {
            "load" => {
              "input" => "data",
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
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/unshorten",
                  "segments" => [
                    {
                      "lit" => "unshorten",
                    },
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
                  "parts" => [
                    "unshorten",
                  ],
                },
              ],
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
