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
}
