<?php
declare(strict_types=1);

// Unshortenme SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class UnshortenmeMakeContext
{
    public static function call(array $ctxmap, ?UnshortenmeContext $basectx): UnshortenmeContext
    {
        return new UnshortenmeContext($ctxmap, $basectx);
    }
}
