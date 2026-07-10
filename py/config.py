# Unshortenme SDK configuration


def make_config():
    return {
        "main": {
            "name": "Unshortenme",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "active": True,
            "name": "shortened_url",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "success",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "unshortened_url",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
        ],
        "name": "unshorten",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "https://bit.ly/3DKWm5t",
                      "kind": "query",
                      "name": "url",
                      "orig": "url",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
