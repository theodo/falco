output "dynamodb_table" {
  value = "${module.terraform_state_backend.dynamodb_table_name}"
}

output "s3_bucket" {
  value = "${module.terraform_state_backend.s3_bucket_id}"
}
