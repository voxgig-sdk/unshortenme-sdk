package voxgigunshortenmesdk

import (
	"github.com/voxgig-sdk/unshortenme-sdk/core"
	"github.com/voxgig-sdk/unshortenme-sdk/entity"
	"github.com/voxgig-sdk/unshortenme-sdk/feature"
	_ "github.com/voxgig-sdk/unshortenme-sdk/utility"
)

// Type aliases preserve external API.
type UnshortenmeSDK = core.UnshortenmeSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type UnshortenmeEntity = core.UnshortenmeEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type UnshortenmeError = core.UnshortenmeError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewUnshortenEntityFunc = func(client *core.UnshortenmeSDK, entopts map[string]any) core.UnshortenmeEntity {
		return entity.NewUnshortenEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewUnshortenmeSDK = core.NewUnshortenmeSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
