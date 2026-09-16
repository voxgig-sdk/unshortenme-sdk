

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { UnshortenmeSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('UnshortenEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when UNSHORTENME_TEST_LIVE=TRUE.
  afterEach(liveDelay('UNSHORTENME_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UnshortenmeSDK.test()
    const ent = testsdk.Unshorten()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.UNSHORTENME_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'unshorten.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"uri","name":"shortened_url","req":true,"short":"The original shortened URL that was provided","type":"`$STRING`","index$":0},{"active":true,"name":"success","req":true,"short":"Indicates whether the unshortening operation was successful","type":"`$BOOLEAN`","index$":1},{"active":true,"format":"uri","name":"unshortened_url","req":true,"short":"The full unshortened URL","type":"`$STRING`","index$":2}],"name":"unshorten","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"https://bit.ly/3DKWm5t","kind":"query","name":"url","orig":"url","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /unshorten","json":"{\"operationId\":\"unshortenUrl\",\"parameters\":[{\"description\":\"The shortened URL to be unshortened\",\"in\":\"query\",\"name\":\"url\",\"required\":true,\"schema\":{\"example\":\"https://bit.ly/3DKWm5t\",\"format\":\"uri\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"successfulUnshorten\":{\"summary\":\"Successful unshorten response\",\"value\":{\"shortened_url\":\"https://bit.ly/3DKWm5t\",\"success\":true,\"unshortened_url\":\"https://www.youtube.com/\"}}},\"schema\":{\"properties\":{\"shortened_url\":{\"description\":\"The original shortened URL that was provided\",\"example\":\"https://bit.ly/3DKWm5t\",\"format\":\"uri\",\"type\":\"string\"},\"success\":{\"description\":\"Indicates whether the unshortening operation was successful\",\"example\":true,\"type\":\"boolean\"},\"unshortened_url\":{\"description\":\"The full unshortened URL\",\"example\":\"https://www.youtube.com/\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"unshortened_url\",\"shortened_url\",\"success\"],\"type\":\"object\"}}},\"description\":\"Successfully unshortened the URL\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Invalid URL parameter\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid URL parameter\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Invalid or missing authorization token\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - invalid or missing authorization token\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Rate limit exceeded. Please upgrade your subscription or contact us.\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"An error occurred while processing your request\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"TokenAuth\":[]}],\"securitySchemes\":{\"TokenAuth\":{\"description\":\"Token-based authentication. Use the format: 'Token {your_token}' where the token can be found in your profile page.\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/unshorten","segments":[{"lit":"unshorten"}],"select":{"exist":["url"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"unshorten","name__orig":"unshorten","Name":"Unshorten","name_":"unshorten","name-":"unshorten","NAME":"UNSHORTEN","index$":0}, {"active":true,"entity":"unshorten","key$":"BasicUnshortenFlow","kind":"basic","name":"BasicUnshortenFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"unshorten_ref01","srcdatavar":"unshorten_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-unshorten_ref01"}}],"index$":0}]}, 'Unshorten')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let unshorten_ref01_data = Object.values(setup.data.existing.unshorten)[0] as any

    // LOAD
    const unshorten_ref01_ent = client.Unshorten()
    const unshorten_ref01_match_dt0: any = {}
    const unshorten_ref01_data_dt0 = (await unshorten_ref01_ent.load(unshorten_ref01_match_dt0)).data()
    assert(null != unshorten_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/unshorten/UnshortenTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = UnshortenmeSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['unshorten01','unshorten02','unshorten03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'UNSHORTENME_TEST_UNSHORTEN_ENTID': idmap,
    'UNSHORTENME_TEST_LIVE': 'FALSE',
    'UNSHORTENME_TEST_EXPLAIN': 'FALSE',
    'UNSHORTENME_APIKEY': '',
  })

  idmap = env['UNSHORTENME_TEST_UNSHORTEN_ENTID']

  const live = 'TRUE' === env.UNSHORTENME_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['UNSHORTENME_TEST_UNSHORTEN_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new UnshortenmeSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
