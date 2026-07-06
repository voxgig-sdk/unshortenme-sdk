# frozen_string_literal: true

# Typed models for the Unshortenme SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Unshorten entity data model.
#
# @!attribute [rw] shortened_url
#   @return [String]
#
# @!attribute [rw] success
#   @return [Boolean]
#
# @!attribute [rw] unshortened_url
#   @return [String]
Unshorten = Struct.new(
  :shortened_url,
  :success,
  :unshortened_url,
  keyword_init: true
)

# Request payload for Unshorten#load.
#
# @!attribute [rw] shortened_url
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] unshortened_url
#   @return [String, nil]
UnshortenLoadMatch = Struct.new(
  :shortened_url,
  :success,
  :unshortened_url,
  keyword_init: true
)

