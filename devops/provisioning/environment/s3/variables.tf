variable "project_name" {}

variable "environment" {}

variable "tags" {
  type    = map(string)
  default = {}
}
