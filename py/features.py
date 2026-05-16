# Unshortenme SDK feature factory

from feature.base_feature import UnshortenmeBaseFeature
from feature.test_feature import UnshortenmeTestFeature


def _make_feature(name):
    features = {
        "base": lambda: UnshortenmeBaseFeature(),
        "test": lambda: UnshortenmeTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
