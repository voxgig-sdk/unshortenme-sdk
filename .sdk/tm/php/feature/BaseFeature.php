<?php
declare(strict_types=1);

// Unshortenme SDK base feature

class UnshortenmeBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(UnshortenmeContext $ctx, array $options): void {}
    public function PostConstruct(UnshortenmeContext $ctx): void {}
    public function PostConstructEntity(UnshortenmeContext $ctx): void {}
    public function SetData(UnshortenmeContext $ctx): void {}
    public function GetData(UnshortenmeContext $ctx): void {}
    public function GetMatch(UnshortenmeContext $ctx): void {}
    public function SetMatch(UnshortenmeContext $ctx): void {}
    public function PrePoint(UnshortenmeContext $ctx): void {}
    public function PreSpec(UnshortenmeContext $ctx): void {}
    public function PreRequest(UnshortenmeContext $ctx): void {}
    public function PreResponse(UnshortenmeContext $ctx): void {}
    public function PreResult(UnshortenmeContext $ctx): void {}
    public function PreDone(UnshortenmeContext $ctx): void {}
    public function PreUnexpected(UnshortenmeContext $ctx): void {}
}
