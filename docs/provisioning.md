# Provisioning

This project runs on [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) and is entirely provisioned by [Terraform](https://www.terraform.io/).

## Prerequisites

- [Terraform](https://www.terraform.io/downloads.html)
- A root user on the AWS account you want to deploy to

## Provisioning
- Get an access key for your AWS user and create a new profile:
  ```ini
  # in ~/.aws/credentials
  [falco]
  aws_access_key_id=<access key id>
  aws_secret_access_key=<secret access key>
  ```
- Go to the provisioning directory:
  ```sh
  cd ./devops/provisioning
  ```
- Initialize terraform configuration:
  ```sh
  terraform init
  ```
- Run terraform:
  ```sh
  terraform apply
  ```
  This can take up to 15 minutes, go get a coffee! ☕️

Now you can [setup continuous deployment](./deployment.md)! 🎉

## Adding more environments

By default the provisioning script will create a staging and a production environment. If you want to create more, edit `devops/provisioning/main.tf` to add another `environment` module, then re-run `terraform apply`. 😉
