provider "aws" {
  region  = var.region
  profile = var.project_name
}

module "terraform_state_backend" {
  source = "git::https://github.com/cloudposse/terraform-aws-tfstate-backend.git?ref=0.8.0"

  region        = var.region
  namespace     = var.project_name
  stage         = "main"
  force_destroy = var.force_destroy

  providers = {
    aws = "aws"
  }

  tags = local.common_tags
}
