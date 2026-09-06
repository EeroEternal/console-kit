use axum::{
    body::Body,
    http::{Request, StatusCode},
};
use console_kit::server::create_router;
use http_body_util::BodyExt;
use tower::ServiceExt;

#[tokio::test]
async fn test_health_check() {
    let app = create_router();

    let response = app
        .oneshot(
            Request::builder()
                .uri("/health")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(response.status(), StatusCode::OK);

    let body = response.into_body().collect().await.unwrap().to_bytes();
    let json: serde_json::Value = serde_json::from_slice(&body).unwrap();

    assert_eq!(json["status"], "ok");
    assert_eq!(json["service"], "console-kit");
}

#[tokio::test]
async fn test_mailer_fallback() {
    let mailer = console_kit::Mailer::log();
    assert!(mailer.skips_email());
    assert!(
        mailer
            .send_verification_code("test@example.com", "123456")
            .await
            .is_ok()
    );
    assert!(
        mailer
            .send_verify_email("test@example.com", "https://example.com/verify")
            .await
            .is_ok()
    );
}
