<?php
declare(strict_types=1);

// Unshortenme SDK utility: feature_hook

class UnshortenmeFeatureHook
{
    public static function call(UnshortenmeContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
