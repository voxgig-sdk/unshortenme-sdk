# Unshortenme SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Unshortenme",
            "slug": "unshortenme",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://unshorten.me/api/v2",
            "auth": {
                "prefix": "",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "unshorten": {},
            },
        },
        "entity": {
      "unshorten": {
        "fields": [
          {
            "name": "shortened_url",
            "req": True,
            "short": "The original shortened URL that was provided",
            "type": "`$STRING`",
          },
          {
            "name": "success",
            "req": True,
            "short": "Indicates whether the unshortening operation was successful",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "unshortened_url",
            "req": True,
            "short": "The full unshortened URL",
            "type": "`$STRING`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/unshorten",
                "parts": [
                  "unshorten",
                ],
                "select": {
                  "exist": [
                    "url",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
