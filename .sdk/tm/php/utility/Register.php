<?php
declare(strict_types=1);

// Unshortenme SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

UnshortenmeUtility::setRegistrar(function (UnshortenmeUtility $u): void {
    $u->clean = [UnshortenmeClean::class, 'call'];
    $u->done = [UnshortenmeDone::class, 'call'];
    $u->make_error = [UnshortenmeMakeError::class, 'call'];
    $u->feature_add = [UnshortenmeFeatureAdd::class, 'call'];
    $u->feature_hook = [UnshortenmeFeatureHook::class, 'call'];
    $u->feature_init = [UnshortenmeFeatureInit::class, 'call'];
    $u->fetcher = [UnshortenmeFetcher::class, 'call'];
    $u->make_fetch_def = [UnshortenmeMakeFetchDef::class, 'call'];
    $u->make_context = [UnshortenmeMakeContext::class, 'call'];
    $u->make_options = [UnshortenmeMakeOptions::class, 'call'];
    $u->make_request = [UnshortenmeMakeRequest::class, 'call'];
    $u->make_response = [UnshortenmeMakeResponse::class, 'call'];
    $u->make_result = [UnshortenmeMakeResult::class, 'call'];
    $u->make_point = [UnshortenmeMakePoint::class, 'call'];
    $u->make_spec = [UnshortenmeMakeSpec::class, 'call'];
    $u->make_url = [UnshortenmeMakeUrl::class, 'call'];
    $u->param = [UnshortenmeParam::class, 'call'];
    $u->prepare_auth = [UnshortenmePrepareAuth::class, 'call'];
    $u->prepare_body = [UnshortenmePrepareBody::class, 'call'];
    $u->prepare_headers = [UnshortenmePrepareHeaders::class, 'call'];
    $u->prepare_method = [UnshortenmePrepareMethod::class, 'call'];
    $u->prepare_params = [UnshortenmePrepareParams::class, 'call'];
    $u->prepare_path = [UnshortenmePreparePath::class, 'call'];
    $u->prepare_query = [UnshortenmePrepareQuery::class, 'call'];
    $u->result_basic = [UnshortenmeResultBasic::class, 'call'];
    $u->result_body = [UnshortenmeResultBody::class, 'call'];
    $u->result_headers = [UnshortenmeResultHeaders::class, 'call'];
    $u->transform_request = [UnshortenmeTransformRequest::class, 'call'];
    $u->transform_response = [UnshortenmeTransformResponse::class, 'call'];
});
