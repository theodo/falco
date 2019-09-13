data "aws_caller_identity" "current" {}

resource "aws_iam_user" "deploy" {
  name = "${var.project_name}-deploy"
}

resource "aws_iam_access_key" "deploy" {
  user = aws_iam_user.deploy.name
}

data "template_file" "deploy_policy" {
  template = "${file("${path.module}/policy.json")}"

  vars {
    account_id       = data.aws_caller_identity.current.account_id
    application_name = var.eb_application
    region           = var.region
    role             = aws_iam_instance_profile.main.name
  }
}

resource "aws_iam_user_policy" "deploy" {
  name = "${var.project_name}-deploy"
  user = aws_iam_user.deploy.name

  policy = data.template_file.deploy_policy.rendered
}

resource "aws_iam_role" "main" {
  name = var.project_name

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "s3" {
  name = "${var.project_name}-s3"
  role = aws_iam_role.main.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:*"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::${var.project_name}-*"
    }
  ]
}
EOF
}

resource "aws_iam_policy_attachment" "eb-web" {
  name       = "${var.project_name}-eb-web"
  roles      = [aws_iam_role.main.name]
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier"
}

resource "aws_iam_policy_attachment" "eb-multi-docker" {
  name       = "${var.project_name}-eb-multi-docker"
  roles      = [aws_iam_role.main.name]
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticBeanstalkMulticontainerDocker"
}

resource "aws_iam_policy_attachment" "eb-ecr-readonly" {
  name       = "${var.project_name}-eb-ecr-readonly"
  roles      = [aws_iam_role.main.name]
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_iam_instance_profile" "main" {
  name = var.project_name
  role = aws_iam_role.main.name
}
