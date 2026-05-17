# Unshortenme SDK



Available for [Golang](go/) and [Go CLI](go-cli/) and [Lua](lua/) and [PHP](php/) and [Python](py/) and [Ruby](rb/) and [TypeScript](ts/).


## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Unshorten** |  | `/unshorten` |

Each entity supports the following operations where available: **load**, **list**, **create**,
**update**, and **remove**.


## Architecture

### Entity-operation model

Every SDK call follows the same pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

At each stage a feature hook fires (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), allowing features to inspect or modify the pipeline.

### Features

Features are hook-based middleware that extend SDK behaviour.

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

You can add custom features by passing them in the `extend` option at
construction time.

### Direct and Prepare

For endpoints not covered by the entity model, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`, `headers`,
and `body`.


## Quick start

### Golang

```go
import sdk "github.com/voxgig-sdk/unshortenme-sdk/go"

client := sdk.NewUnshortenmeSDK(map[string]any{
    "apikey": os.Getenv("UNSHORTENME_APIKEY"),
})

```

### Lua

```lua
local sdk = require("unshortenme_sdk")

local client = sdk.new({
  apikey = os.getenv("UNSHORTENME_APIKEY"),
})


-- Load a specific unshorten
local unshorten, err = client:Unshorten(nil):load(
  { id = "example_id" }, nil
)
```

### PHP

```php
<?php
require_once 'unshortenme_sdk.php';

$client = new UnshortenmeSDK([
    "apikey" => getenv("UNSHORTENME_APIKEY"),
]);


// Load a specific unshorten
[$unshorten, $err] = $client->Unshorten(null)->load(
    ["id" => "example_id"], null
);
```

### Python

```python
import os
from unshortenme_sdk import UnshortenmeSDK

client = UnshortenmeSDK({
    "apikey": os.environ.get("UNSHORTENME_APIKEY"),
})


# Load a specific unshorten
unshorten, err = client.Unshorten(None).load(
    {"id": "example_id"}, None
)
```

### Ruby

```ruby
require_relative "Unshortenme_sdk"

client = UnshortenmeSDK.new({
  "apikey" => ENV["UNSHORTENME_APIKEY"],
})


# Load a specific unshorten
unshorten, err = client.Unshorten(nil).load(
  { "id" => "example_id" }, nil
)
```

### TypeScript

```ts
import { UnshortenmeSDK } from 'unshortenme'

const client = new UnshortenmeSDK({
  apikey: process.env.UNSHORTENME_APIKEY,
})

```


## Testing

Both SDKs provide a test mode that replaces the HTTP transport with an
in-memory mock, so tests run without a network connection.

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Unshorten(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Unshorten(nil):load(
  { id = "test01" }, nil
)
```

### PHP

```php
$client = UnshortenmeSDK::test(null, null);
[$result, $err] = $client->Unshorten(null)->load(
    ["id" => "test01"], null
);
```

### Python

```python
client = UnshortenmeSDK.test(None, None)
result, err = client.Unshorten(None).load(
    {"id": "test01"}, None
)
```

### Ruby

```ruby
client = UnshortenmeSDK.test(nil, nil)
result, err = client.Unshorten(nil).load(
  { "id" => "test01" }, nil
)
```

### TypeScript

```ts
const client = UnshortenmeSDK.test()
const result = await client.Unshorten().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```


## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
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

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
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

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```


## Language-specific documentation

- [Golang SDK](go/README.md)
- [Go CLI SDK](go-cli/README.md)
- [Lua SDK](lua/README.md)
- [PHP SDK](php/README.md)
- [Python SDK](py/README.md)
- [Ruby SDK](rb/README.md)
- [TypeScript SDK](ts/README.md)

