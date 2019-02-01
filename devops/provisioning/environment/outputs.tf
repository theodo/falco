output "url" {
  value = "http://${aws_elastic_beanstalk_environment.main.cname}"
}
