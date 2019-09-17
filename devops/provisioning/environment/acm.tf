resource "aws_acm_certificate" "main" {
  count = "${var.https_domain != "" ? 1 : 0}"

  domain_name       = var.https_domain
  validation_method = "EMAIL"

  lifecycle {
    create_before_destroy = true
  }

  tags = local.common_tags
}

resource "aws_acm_certificate_validation" "main" {
  count = "${var.https_domain != "" ? 1 : 0}"

  certificate_arn = aws_acm_certificate.main[count.index].arn
}
