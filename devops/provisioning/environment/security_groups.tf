resource "aws_security_group" "lb" {
  name = "${var.project_name}-${var.environment}-lb"
}

resource "aws_security_group" "instances" {
  name = "${var.project_name}-${var.environment}-instances"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.common_tags
}

resource "aws_security_group" "sqs" {
  name   = "${var.project_name}-${var.environment}-sqs"
  vpc_id = var.vpc

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.common_tags
}

resource "aws_vpc_endpoint" "sqs" {
  vpc_id            = var.vpc
  service_name      = "com.amazonaws.${var.region}.sqs"
  vpc_endpoint_type = "Interface"

  security_group_ids = [
    aws_security_group.sqs.id,
  ]

  tags = local.common_tags
}
