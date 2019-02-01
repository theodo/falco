# Setting up HTTPS

## Requirements

- A [provisioned project](./provisioning.md)
- A custom domain name (we'll use `project.com` as an example below) with access to:
  - DNS records (you'll need to create a new `CNAME` record)
  - one of the following email addresses (used to authorise creation of a certificate):
    - administrator@project.com
    - hostmaster@project.com
    - postmaster@project.com
    - webmaster@project.com
    - admin@project.com

## Steps

- Create a `CNAME` record pointing your custom domain to the domain returned by terraform in either `production_url` or `staging_url`
- Add a `https_domain` argument to the environment you want to enable HTTPS on in `devops/provisioning/main.tf`:
  ```diff
   module "env_production" {
     source = "environment"

     region               = "${var.region}"
     project_name         = "${var.project_name}"
     environment          = "production"
     eb_application       = "${aws_elastic_beanstalk_application.main.name}"
     eb_instance_profile  = "${aws_iam_instance_profile.main.name}"
     eb_key_pair          = "${aws_key_pair.main.key_name}"
     db_allocated_storage = 20
     db_instance_class    = "db.t2.small"
  +  https_domain         = "project.com"
     vpc                  = "${data.aws_vpc.default.id}"
     vpc_subnets          = "${data.aws_subnet_ids.default.ids}"
   }
  ```
- Re-run terraform: `cd devops/provisioning && terraform apply`
- During the re-provisioning you should receive an email on one of the [addresses listed above](#requirements).
  Click the link and approve the creation of a certificate.
  If you don't receive an email automatically, you might have to go into ACM and manually resend a validation email.
- Wait for the provisioning to finish.
- In the meantime, [adapt your Django config](https://docs.djangoproject.com/en/2.1/topics/security/#ssl-https) to enforce HTTPS (SSL redirect, HSTS, proxy header and secure cookies).
- Enjoy https://project.com 🎉
