# Unshortenme SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module UnshortenmeFeatures
  def self.make_feature(name)
    case name
    when "base"
      UnshortenmeBaseFeature.new
    when "ratelimit"
      UnshortenmeRatelimitFeature.new
    when "retry"
      UnshortenmeRetryFeature.new
    when "test"
      UnshortenmeTestFeature.new
    when "timeout"
      UnshortenmeTimeoutFeature.new
    else
      UnshortenmeBaseFeature.new
    end
  end
end
