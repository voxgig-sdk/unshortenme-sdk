<?php
declare(strict_types=1);

// Unshortenme SDK utility: prepare_body

class UnshortenmePrepareBody
{
    public static function call(UnshortenmeContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
