# Provisioning

This project runs on [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) and is entirely provisioned by [Terraform](https://www.terraform.io/).

## Prerequisites

- [Terraform](https://www.terraform.io/downloads.html)
- A root user on the AWS account you want to deploy to

## Provision Terraform remote backend

> You should only need to do the steps in this section *once* for the entire project.

- Get an access key for your AWS user and create a new profile:
  ```ini
  # in ~/.aws/credentials
  [falco]
  aws_access_key_id=<access key id>
  aws_secret_access_key=<secret access key>
  ```
- Go to the remote backend provisioning directory:
  ```sh
  cd ./devops/tfbackend
  ```
- Run the remote backend provisioning script:
  ```sh
  terraform apply
  ```
- Once this is done, make sure Terraform's output matches the values for `bucket` and `dynamodb_table` in `devops/provisioning/main.tf` (lines 4 and 5).

## Provision falco

- Go to the main provisioning directory:
  ```sh
  cd ./devops/provisioning
  ```
- Initialise terraform:
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
