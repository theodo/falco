variable "region" {}

variable "project_name" {}

variable "environment" {}

variable "eb_application" {}

variable "eb_health_check" {
  default = "/health"
}

variable "eb_instance_profile" {}

# We don't recommend using smaller instances as they risk running OOM.
# Change at your own risk.
variable "eb_instance_type" {
  default = "t2.medium"
}

variable "eb_key_pair" {}

variable "db_allocated_storage" {}

variable "db_instance_class" {}

variable "https_domain" {
  default = ""
}

variable "vpc" {}

variable "vpc_subnets" {
  type = "list"
}

variable "sqs_user_aws_iam_access_key_id" {}

variable "sqs_user_aws_iam_secret_access_key" {}
