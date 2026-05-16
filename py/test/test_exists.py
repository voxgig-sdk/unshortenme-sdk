# ProjectName SDK exists test

import pytest
from unshortenme_sdk import UnshortenmeSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = UnshortenmeSDK.test(None, None)
        assert testsdk is not None
