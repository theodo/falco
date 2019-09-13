output "deploy_user_aws_iam_instance_profile_name" {
  value = module.deploy_user.aws_iam_instance_profile_name
}

output "deploy_user_aws_iam_access_key_id" {
  value = module.deploy_user.aws_iam_access_key_id
}

output "deploy_user_aws_iam_secret_access_key" {
  value = module.deploy_user.aws_iam_secret_access_key
}

output "sqs_user_aws_iam_access_key_id" {
  value = module.sqs_user.aws_iam_access_key_id
}

output "sqs_user_aws_iam_secret_access_key" {
  value = module.sqs_user.aws_iam_secret_access_key
}
