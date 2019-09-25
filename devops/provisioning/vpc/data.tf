data "aws_availability_zones" "available" {}

locals {
  az_count           = length(data.aws_availability_zones.available.names)
  total_subnet_count = local.az_count * 2
}
