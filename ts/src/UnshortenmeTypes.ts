// Typed models for the Unshortenme SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Unshorten {
  shortened_url: string
  success: boolean
  unshortened_url: string
}

export type UnshortenLoadMatch = Partial<Unshorten>

