<?php
declare(strict_types=1);

// Unshortenme SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class UnshortenmeFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new UnshortenmeBaseFeature();
            case "test":
                return new UnshortenmeTestFeature();
            default:
                return new UnshortenmeBaseFeature();
        }
    }
}
