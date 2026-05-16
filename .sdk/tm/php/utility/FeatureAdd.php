<?php
declare(strict_types=1);

// Unshortenme SDK utility: feature_add

class UnshortenmeFeatureAdd
{
    public static function call(UnshortenmeContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
