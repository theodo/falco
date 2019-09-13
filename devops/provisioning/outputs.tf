output "staging_url" {
  value = module.env_staging.url
}

output "production_url" {
  value = module.env_production.url
}

output "BACKEND_REPO_URL" {
  value = aws_ecr_repository.backend.repository_url
}

output "CELERY_WORKER_REPO_URL" {
  value = aws_ecr_repository.celeryworker.repository_url
}

output "CELERY_BEAT_REPO_URL" {
  value = aws_ecr_repository.celerybeat.repository_url
}

output "STATIC_REPO_URL" {
  value = aws_ecr_repository.static.repository_url
}

output "AWS_ACCESS_KEY_ID" {
  value = module.iam.deploy_user_aws_iam_access_key_id
}

output "AWS_SECRET_ACCESS_KEY" {
  value = module.iam.deploy_user_aws_iam_secret_access_key
}
