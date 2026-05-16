# Unshortenme SDK utility: make_context
require_relative '../core/context'
module UnshortenmeUtilities
  MakeContext = ->(ctxmap, basectx) {
    UnshortenmeContext.new(ctxmap, basectx)
  }
end
