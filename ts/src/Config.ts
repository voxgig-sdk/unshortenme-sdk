
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://unshorten.me/api/v2',

    auth: {
      prefix: '',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      unshorten: {
      },

    }
  }


  entity = {
    "unshorten": {
      "fields": [
        {
          "active": true,
          "name": "shortened_url",
          "req": true,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "success",
          "req": true,
          "type": "`$BOOLEAN`",
          "index$": 1
        },
        {
          "active": true,
          "name": "unshortened_url",
          "req": true,
          "type": "`$STRING`",
          "index$": 2
        }
      ],
      "name": "unshorten",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": "https://bit.ly/3DKWm5t",
                    "kind": "query",
                    "name": "url",
                    "orig": "url",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/unshorten",
              "parts": [
                "unshorten"
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
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

