data "aws_caller_identity" "current" {}

resource "aws_iam_user" "sqs" {
  name = "${var.project_name}-sqs"
}

resource "aws_iam_access_key" "sqs" {
  user = aws_iam_user.sqs.name
}

resource "aws_iam_user_policy_attachment" "sqs" {
  user       = aws_iam_user.sqs.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSQSFullAccess"
}
