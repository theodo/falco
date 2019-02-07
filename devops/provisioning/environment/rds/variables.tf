variable "project_name" {}

variable "environment" {}

variable "allocated_storage" {
  default = 5
}

variable "instance_class" {
  default = "db.t2.micro"
}

variable "ingress_sg" {}
