module "deploy_user" {
  source = "deploy_user"

  project_name   = var.project_name
  eb_application = var.eb_application
  region         = var.region
}

module "sqs_user" {
  source = "sqs_user"

  project_name = var.project_name
}
