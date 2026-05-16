# Unshortenme SDK utility: make_context

from core.context import UnshortenmeContext


def make_context_util(ctxmap, basectx):
    return UnshortenmeContext(ctxmap, basectx)
