provider "aws" {
  region  = var.region
  profile = "${var.project_name}-root"
}

# Provisioning user

resource "aws_iam_user" "provision" {
  name = "${var.project_name}-provision"

  tags = local.common_tags
}

resource "aws_iam_access_key" "provision" {
  user = aws_iam_user.provision.name
}

module "tf_backend_policy" {
  source = "./policy"

  file         = "policy-tf-backend.json"
  name         = "provision-tf-backend"
  project_name = var.project_name
  region       = var.region
}

resource "aws_iam_user_policy_attachment" "tf_backend_attachment" {
  user       = aws_iam_user.provision.name
  policy_arn = module.tf_backend_policy.arn
}

module "site_policy" {
  source = "./policy"

  file         = "policy-site.json"
  name         = "provision-site"
  project_name = var.project_name
  region       = var.region
}

resource "aws_iam_user_policy_attachment" "site_attachment" {
  user       = aws_iam_user.provision.name
  policy_arn = module.site_policy.arn
}

# Deployment user

resource "aws_iam_user" "deploy" {
  name = "${var.project_name}-deploy"

  tags = local.common_tags
}

resource "aws_iam_access_key" "deploy" {
  user = aws_iam_user.deploy.name
}

module "deploy_policy" {
  source = "./policy"

  file         = "policy-deploy.json"
  name         = "deploy"
  project_name = var.project_name
  region       = var.region
}

resource "aws_iam_user_policy_attachment" "deploy_attachment" {
  user       = aws_iam_user.deploy.name
  policy_arn = module.deploy_policy.arn
}
