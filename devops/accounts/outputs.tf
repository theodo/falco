output "provision_profile_name" {
  value = aws_iam_user.provision.id
}

output "PROVISION_AWS_ACCESS_KEY_ID" {
  value = aws_iam_access_key.provision.id
}

output "PROVISION_AWS_SECRET_ACCESS_KEY" {
  value = aws_iam_access_key.provision.secret
}

output "deploy_profile_name" {
  value = aws_iam_user.deploy.id
}

output "DEPLOY_AWS_ACCESS_KEY_ID" {
  value = aws_iam_access_key.deploy.id
}

output "DEPLOY_AWS_SECRET_ACCESS_KEY" {
  value = aws_iam_access_key.deploy.secret
}
