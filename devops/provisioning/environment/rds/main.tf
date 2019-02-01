resource "random_string" "db_password" {
  length  = 16
  special = false
}

resource "aws_security_group" "db" {
  name = "${var.project_name}-${var.environment}-database"

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = ["${var.ingress_sg}"]
  }
}

resource "aws_db_instance" "main" {
  identifier     = "${var.project_name}-${var.environment}"
  engine         = "postgres"
  engine_version = 10.3

  name     = "${var.project_name}"
  username = "${var.project_name}"
  password = "${random_string.db_password.result}"

  allocated_storage           = "${var.allocated_storage}"
  allow_major_version_upgrade = false
  auto_minor_version_upgrade  = true
  backup_retention_period     = 7
  final_snapshot_identifier   = "${var.project_name}-${var.environment}-${md5(timestamp())}"
  instance_class              = "${var.instance_class}"
  kms_key_id                  = "${var.kms_key_id}"
  multi_az                    = "${var.environment == "production"}"
  publicly_accessible         = false
  skip_final_snapshot         = false
  storage_encrypted           = true
  storage_type                = "gp2"
  vpc_security_group_ids      = ["${aws_security_group.db.id}"]
}
