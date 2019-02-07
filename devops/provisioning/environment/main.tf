data "aws_elastic_beanstalk_solution_stack" "multi_docker" {
  most_recent = true
  name_regex  = "^64bit Amazon Linux (.*) Multi-container Docker (.*)$"
}

resource "random_string" "secret_key" {
  length  = 32
  special = false
}

module "rds" {
  source = "rds"

  project_name      = "${var.project_name}"
  environment       = "${var.environment}"
  allocated_storage = "${var.db_allocated_storage}"
  instance_class    = "${var.db_instance_class}"
  ingress_sg        = "${aws_security_group.instances.id}"
}

module "s3" {
  source = "s3"

  project_name = "${var.project_name}"
  environment  = "${var.environment}"
}

module "sqs" {
  source = "sqs"

  project_name = "${var.project_name}"
  environment  = "${var.environment}"
}

resource "aws_elastic_beanstalk_environment" "main" {
  name                = "${var.environment}"
  application         = "${var.eb_application}"
  cname_prefix        = "${var.project_name}-${var.environment}"
  solution_stack_name = "${data.aws_elastic_beanstalk_solution_stack.multi_docker.name}"

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "EC2KeyName"
    value     = "${var.eb_key_pair}"
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "${var.eb_instance_profile}"
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "InstanceType"
    value     = "${var.eb_instance_type}"
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "SecurityGroups"
    value     = "${aws_security_group.instances.id}"
  }

  setting {
    namespace = "aws:autoscaling:updatepolicy:rollingupdate"
    name      = "RollingUpdateEnabled"
    value     = "true"
  }

  setting {
    namespace = "aws:autoscaling:updatepolicy:rollingupdate"
    name      = "RollingUpdateType"
    value     = "Health"
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "VPCId"
    value     = "${var.vpc}"
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "Subnets"
    value     = "${join(",", var.vpc_subnets)}"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "ALLOWED_HOST"
    value     = "${var.project_name}-${var.environment}.${var.region}.elasticbeanstalk.com"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "DATABASE_URL"
    value     = "${module.rds.url}"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "LOG_PATH"
    value     = "/var/log/${var.project_name}/django.log"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "MEDIA_BUCKET"
    value     = "${module.s3.bucket_name}"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "SECRET_KEY"
    value     = "${random_string.secret_key.result}"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "DJANGO_SETTINGS_MODULE"
    value     = "root.settings.prod"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "CELERY_BROKER_URL"
    value     = "sqs://"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "CELERY_TASK_DEFAULT_QUEUE"
    value     = "${module.sqs.sqs_queue_name}"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "AWS_ACCESS_KEY_ID"
    value     = "${var.sqs_user_aws_iam_access_key_id}"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "AWS_SECRET_ACCESS_KEY"
    value     = "${urlencode(var.sqs_user_aws_iam_secret_access_key)}@"
  }

  setting {
    namespace = "aws:elasticbeanstalk:cloudwatch:logs"
    name      = "StreamLogs"
    value     = "true"
  }

  setting {
    namespace = "aws:elasticbeanstalk:command"
    name      = "DeploymentPolicy"
    value     = "Rolling"
  }

  setting {
    namespace = "aws:elasticbeanstalk:command"
    name      = "BatchSize"
    value     = "30"
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "EnvironmentType"
    value     = "LoadBalanced"
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "LoadBalancerType"
    value     = "application"
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment:process:default"
    name      = "HealthCheckPath"
    value     = "/health"
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment:process:static"
    name      = "HealthCheckPath"
    value     = "/health"
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment:process:static"
    name      = "Port"
    value     = "81"
  }

  setting {
    namespace = "aws:elasticbeanstalk:healthreporting:system"
    name      = "SystemType"
    value     = "enhanced"
  }

  setting {
    namespace = "aws:elb:loadbalancer"
    name      = "SecurityGroups"
    value     = "${aws_security_group.lb.id}"
  }

  setting {
    namespace = "aws:elbv2:listener:default"
    name      = "Rules"
    value     = "static"
  }

  setting {
    namespace = "aws:elbv2:listener:443"
    name      = "ListenerEnabled"
    value     = "${var.https_domain != "" ? "true" : "false"}"
  }

  setting {
    namespace = "aws:elbv2:listener:443"
    name      = "Protocol"
    value     = "${var.https_domain != "" ? "HTTPS" : "HTTP"}"
  }

  setting {
    namespace = "aws:elbv2:listener:443"
    name      = "Rules"
    value     = "static"
  }

  setting {
    namespace = "aws:elbv2:listener:443"
    name      = "SSLCertificateArns"
    value     = "${join(",",aws_acm_certificate.main.*.arn)}"
  }

  setting {
    namespace = "aws:elbv2:listenerrule:static"
    name      = "PathPatterns"
    value     = "/static/*"
  }

  setting {
    namespace = "aws:elbv2:listenerrule:static"
    name      = "Process"
    value     = "static"
  }
}
