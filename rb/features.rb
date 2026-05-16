# Unshortenme SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module UnshortenmeFeatures
  def self.make_feature(name)
    case name
    when "base"
      UnshortenmeBaseFeature.new
    when "test"
      UnshortenmeTestFeature.new
    else
      UnshortenmeBaseFeature.new
    end
  end
end
