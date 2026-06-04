# Unshortenme SDK

Expand shortened URLs back to their original destinations via a simple authenticated JSON endpoint

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Unshorten.me API

Unshorten.me is a URL-expansion service operated by [unshorten.me](https://unshorten.me/) that takes a shortened link (for example from goo.gl, bit.ly and similar shorteners) and returns the underlying long URL. The v2 API exposes a single JSON endpoint suitable for programmatic resolution of links.

What you get from the API:
- Resolve a shortened URL to its original destination via `GET /api/v2/unshorten?url={short_url}`
- A JSON response containing `unshortened_url`, `shortened_url`, and a boolean `success` field
- Caching of previously resolved URLs so repeat lookups are fast

Operational notes: requests require an `Authorization: Token {token}` header tied to an account profile. Rate limits apply per hour to fresh resolutions and vary by subscription tier; previously cached results do not count against the limit. CORS is disabled, so the API is intended for server-side use.

## Try it

**TypeScript**
```bash
npm install unshortenme
```

**Python**
```bash
pip install unshortenme-sdk
```

**PHP**
```bash
composer require voxgig/unshortenme-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/unshortenme-sdk/go
```

**Ruby**
```bash
gem install unshortenme-sdk
```

**Lua**
```bash
luarocks install unshortenme-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { UnshortenmeSDK } from 'unshortenme'

const client = new UnshortenmeSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o unshortenme-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "unshortenme": {
      "command": "/abs/path/to/unshortenme-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Unshorten** | URL-expansion resource that resolves a shortened link to its original destination; backed by `GET /api/v2/unshorten?url={short_url}`. | `/unshorten` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from unshortenme_sdk import UnshortenmeSDK

client = UnshortenmeSDK({})


# Load a specific unshorten
unshorten, err = client.Unshorten(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'unshortenme_sdk.php';

$client = new UnshortenmeSDK([]);


// Load a specific unshorten
[$unshorten, $err] = $client->Unshorten(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/unshortenme-sdk/go"

client := sdk.NewUnshortenmeSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "Unshortenme_sdk"

client = UnshortenmeSDK.new({})


# Load a specific unshorten
unshorten, err = client.Unshorten(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("unshortenme_sdk")

local client = sdk.new({})


-- Load a specific unshorten
local unshorten, err = client:Unshorten(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = UnshortenmeSDK.test()
const result = await client.Unshorten().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = UnshortenmeSDK.test(None, None)
result, err = client.Unshorten(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = UnshortenmeSDK::test(null, null);
[$result, $err] = $client->Unshorten(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Unshorten(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = UnshortenmeSDK.test(nil, nil)
result, err = client.Unshorten(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Unshorten(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Unshorten.me API

- Upstream: [https://unshorten.me/](https://unshorten.me/)
- API docs: [https://unshorten.me/api](https://unshorten.me/api)

- Operated by unshorten.me (copyright 2016 onwards)
- No open-source licence is published for the API itself
- Use is subject to the site's terms and privacy policy
- Higher-volume use requires contacting the operator

---

Generated from the Unshorten.me API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
