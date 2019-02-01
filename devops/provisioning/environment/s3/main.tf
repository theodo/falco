resource "aws_s3_bucket" "media" {
  bucket = "${var.project_name}-${var.environment}-media"
  acl    = "private"
}
