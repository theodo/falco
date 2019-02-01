variable "project_name" {}

variable "environment" {}

variable "allocated_storage" {
  default = 5
}

variable "instance_class" {
  default = "db.t2.small"
}

variable "ingress_sg" {}

variable "kms_key_id" {}
