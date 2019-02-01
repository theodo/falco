output "aws_iam_instance_profile_name" {
  value = "${aws_iam_instance_profile.main.name}"
}

output "aws_iam_access_key_id" {
  value = "${aws_iam_access_key.deploy.id}"
}

output "aws_iam_secret_access_key" {
  value = "${aws_iam_access_key.deploy.secret}"
}
