provider "aws" {
  region  = "${var.region}"
  profile = "${var.project_name}"
}

module "terraform_state_backend" {
  source = "git::https://github.com/cloudposse/terraform-aws-tfstate-backend.git?ref=master"

  region        = "${var.region}"
  namespace     = "${var.project_name}"
  stage         = "main"
  force_destroy = "${var.force_destroy}"
}
