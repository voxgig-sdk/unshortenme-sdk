# Unshortenme SDK feature factory

from unshortenme_sdk.feature.base_feature import UnshortenmeBaseFeature
from unshortenme_sdk.feature.ratelimit_feature import UnshortenmeRatelimitFeature
from unshortenme_sdk.feature.retry_feature import UnshortenmeRetryFeature
from unshortenme_sdk.feature.test_feature import UnshortenmeTestFeature
from unshortenme_sdk.feature.timeout_feature import UnshortenmeTimeoutFeature


_FEATURES = {
    "base": lambda: UnshortenmeBaseFeature(),
    "ratelimit": lambda: UnshortenmeRatelimitFeature(),
    "retry": lambda: UnshortenmeRetryFeature(),
    "test": lambda: UnshortenmeTestFeature(),
    "timeout": lambda: UnshortenmeTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
