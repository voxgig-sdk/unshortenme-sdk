<?php
declare(strict_types=1);

// Typed models for the Unshortenme SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Unshorten entity data model. */
class Unshorten
{
    public string $shortened_url;
    public bool $success;
    public string $unshortened_url;
}

/** Request payload for Unshorten#load. */
class UnshortenLoadMatch
{
    public ?string $shortened_url = null;
    public ?bool $success = null;
    public ?string $unshortened_url = null;
}

