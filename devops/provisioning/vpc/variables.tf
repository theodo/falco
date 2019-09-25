variable "project_name" {}

variable "vpc_cidr_block" {
  default = "10.0.0.0/16"
}

variable "key_pair" {}

variable "tags" {
  type    = map(string)
  default = {}
}
