<?php
declare(strict_types=1);

// Unshortenme SDK utility: result_headers

class UnshortenmeResultHeaders
{
    public static function call(UnshortenmeContext $ctx): ?UnshortenmeResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
