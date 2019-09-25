resource "random_string" "db_password" {
  length  = 16
  special = false
}

resource "aws_security_group" "db" {
  name = "${var.project_name}-${var.environment}-database"
  vpc_id = var.vpc

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [var.ingress_sg]
  }

  tags = local.common_tags
}

resource "aws_db_subnet_group" "main" {
  name       = "${var.project_name}-${var.environment}-db_subnet"
  subnet_ids = var.vpc_private_subnets

  tags = merge(local.common_tags, {
    Name = "${var.project_name}-${var.environment}-db_subnet"
  })
}

resource "aws_db_instance" "main" {
  identifier     = "${var.project_name}-${var.environment}"
  engine         = "postgres"
  engine_version = 10.6

  name     = replace(var.project_name, "-", "")
  username = replace(var.project_name, "-", "")
  password = random_string.db_password.result

  allocated_storage           = var.allocated_storage
  allow_major_version_upgrade = false
  auto_minor_version_upgrade  = true
  backup_retention_period     = 7
  db_subnet_group_name        = aws_db_subnet_group.main.name
  final_snapshot_identifier   = "${var.project_name}-${var.environment}-${md5(timestamp())}"
  instance_class              = var.instance_class
  multi_az                    = false
  publicly_accessible         = false
  skip_final_snapshot         = false
  storage_encrypted           = true
  storage_type                = "gp2"
  vpc_security_group_ids      = [aws_security_group.db.id]

  tags = local.common_tags
}
