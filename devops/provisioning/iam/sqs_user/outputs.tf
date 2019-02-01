output "aws_iam_access_key_id" {
  value = "${aws_iam_access_key.sqs.id}"
}

output "aws_iam_secret_access_key" {
  value = "${aws_iam_access_key.sqs.secret}"
}
