<?php
declare(strict_types=1);

// Unshortenme SDK utility: result_body

class UnshortenmeResultBody
{
    public static function call(UnshortenmeContext $ctx): ?UnshortenmeResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
