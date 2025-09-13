<?php
// backend/app/core/JwtHelper.php
require_once __DIR__ . '/../../config/config.php';

class JwtHelper {
    public static function encode($payload, $key = JWT_SECRET, $exp = 3600) {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload['exp'] = time() + $exp;
        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($payload)));
        $signature = hash_hmac('sha256', "$base64UrlHeader.$base64UrlPayload", $key, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        return "$base64UrlHeader.$base64UrlPayload.$base64UrlSignature";
    }

    public static function decode($jwt, $key = JWT_SECRET) {
        $parts = explode('.', $jwt);
        if (count($parts) !== 3) return false;
        list($header, $payload, $signature) = $parts;
        $validSig = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(hash_hmac('sha256', "$header.$payload", $key, true)));
        if (!hash_equals($validSig, $signature)) return false;
        $payloadArr = json_decode(base64_decode(strtr($payload, '-_', '+/')), true);
        if (!$payloadArr || !isset($payloadArr['exp']) || $payloadArr['exp'] < time()) return false;
        return $payloadArr;
    }
}
