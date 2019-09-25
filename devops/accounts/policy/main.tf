data "aws_caller_identity" "current" {}

data "template_file" "main" {
  template = file(var.file)

  vars = {
    account_id   = data.aws_caller_identity.current.account_id
    project_name = var.project_name
    region       = var.region
  }
}

resource "aws_iam_policy" "main" {
  name   = "${var.project_name}-${var.name}"
  policy = data.template_file.main.rendered
}
