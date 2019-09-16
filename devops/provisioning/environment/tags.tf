locals {
  common_tags = merge(var.tags, {
    Environment = "${var.environment}"
  })
}

resource "aws_resourcegroups_group" "environment" {
  name = "${var.project_name}-${var.environment}"

  resource_query {
    query = <<JSON
{
  "ResourceTypeFilters": [
    "AWS::AllSupported"
  ],
  "TagFilters": [
    {
      "Key": "Project",
      "Values": ["${var.project_name}"]
    },
    {
      "Key": "Environment",
      "Values": ["${var.environment}"]
    }
  ]
}
JSON
  }
}
