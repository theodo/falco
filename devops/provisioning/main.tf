terraform {
  backend "s3" {
    region         = "eu-west-3"
    bucket         = "falco-main-terraform-state"
    dynamodb_table = "falco-main-terraform-state-lock"
    key            = "terraform.tfstate"
    encrypt        = true
    profile        = "falco"
  }
}

provider "aws" {
  region  = var.region
  profile = var.project_name
}

resource "aws_key_pair" "main" {
  key_name   = var.project_name
  public_key = file("../eb.pem.pub")
}

resource "aws_elastic_beanstalk_application" "main" {
  name = var.project_name

  tags = local.common_tags
}

resource "aws_ecr_repository" "backend" {
  name = "${var.project_name}/backend"

  tags = local.common_tags
}

resource "aws_ecr_repository" "celeryworker" {
  name = "${var.project_name}/celeryworker"
}

resource "aws_ecr_repository" "celerybeat" {
  name = "${var.project_name}/celerybeat"
}

resource "aws_ecr_repository" "static" {
  name = "${var.project_name}/static"

  tags = local.common_tags
}

module "iam" {
  source         = "iam"
  region         = var.region
  project_name   = var.project_name
  eb_application = aws_elastic_beanstalk_application.main.name
}

module "env_staging" {
  source = "environment"

  region                             = var.region
  project_name                       = var.project_name
  environment                        = "staging"
  eb_application                     = aws_elastic_beanstalk_application.main.name
  eb_instance_profile                = module.iam.deploy_user_aws_iam_instance_profile_name
  eb_key_pair                        = aws_key_pair.main.key_name
  db_allocated_storage               = 5
  db_instance_class                  = "db.t2.small"
  vpc                                = data.aws_vpc.default.id
  vpc_subnets                        = data.aws_subnet_ids.default.ids
  sqs_user_aws_iam_access_key_id     = module.iam.sqs_user_aws_iam_access_key_id
  sqs_user_aws_iam_secret_access_key = module.iam.sqs_user_aws_iam_secret_access_key
}

module "env_production" {
  source = "environment"

  region                             = var.region
  project_name                       = var.project_name
  environment                        = "production"
  eb_application                     = aws_elastic_beanstalk_application.main.name
  eb_instance_profile                = module.iam.deploy_user_aws_iam_instance_profile_name
  eb_key_pair                        = aws_key_pair.main.key_name
  db_allocated_storage               = 5
  db_instance_class                  = "db.t2.small"
  https_domain                       = "getfal.co"
  vpc                                = data.aws_vpc.default.id
  vpc_subnets                        = data.aws_subnet_ids.default.ids
  sqs_user_aws_iam_access_key_id     = module.iam.sqs_user_aws_iam_access_key_id
  sqs_user_aws_iam_secret_access_key = module.iam.sqs_user_aws_iam_secret_access_key
}
