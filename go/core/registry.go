package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewUnshortenEntityFunc func(client *UnshortenmeSDK, entopts map[string]any) UnshortenmeEntity

