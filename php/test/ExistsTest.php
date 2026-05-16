<?php
declare(strict_types=1);

// Unshortenme SDK exists test

require_once __DIR__ . '/../unshortenme_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = UnshortenmeSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
