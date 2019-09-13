locals {
  common_tags = {
    Project = var.project_name
  }
}

resource "aws_resourcegroups_group" "main" {
  name = var.project_name

  resource_query {
    query = <<JSON
{
  "ResourceTypeFilters": [
    "AWS::AllSupported"
  ],
  "TagFilters": [
    {
      "Key": "Project",
      "Values": [var.project_name]
    }
  ]
}
JSON
  }
}
