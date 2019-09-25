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

output "bastion_ip" {
  value = module.vpc.bastion_ip
}
