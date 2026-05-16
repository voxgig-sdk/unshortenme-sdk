# Unshortenme SDK utility: feature_add
module UnshortenmeUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
