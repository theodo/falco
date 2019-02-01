# Deployment

## Continuous deployment

Once terraform has finished provisioning your project (see [the provisioning docs](./provisioning.md)), it should have returned 6 values:

- `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`: the deployment user access key
- `BACKEND_REPO_URL` and `STATIC_REPO_URL`: the URL of the repositories we'll send our docker images to
- `production_url`: URL of the production environment
- `staging_url`: URL of the staging environment

You can now setup continuous deployment:
- [Setup your project in CircleCI](https://circleci.com/add-projects/gh/Theodo-UK)
- In CircleCI, go to Settings > Environment Variables and add the following variables:
  - `BACKEND_REPO_URL`: as returned by terraform
  - `STATIC_REPO_URL`: as returned by terraform
  - `AWS_ACCESS_KEY_ID`: the access key id returned by terraform
  - `AWS_SECRET_ACCESS_KEY`: the secret access key returned by terraform
- Re-build / push ... and your project should automagically be deployed! 🎉

## Version promotion

By default, EB versions are environment-independant.

If you're happy with a version running in staging/preprod and want to deploy it to production, no need to go through the CD pipeline again!
Simply select the existing version in the EB console and deploy it to another environment. 🎊

![Version promotion in EB](./promotion.png)

You can also use this interface to rollback to a previous version.

## Manual deployment

> Do you really need to do this? 🤔

In the following, replace:
- `__tag__` with the tag you want to use for this deployment (usually a full commit hash) ;
- `__backend_repository_url__` and `__static_repository_url__` with the urls returned by terraform.

### Build images
```sh
cd ./devops/deployment && make images
```

### Tag images
```sh
docker tag falco/backend:latest __backend_repository_url__:__tag__
docker tag falco/static:latest __static_repository_url__:__tag__
```

### Push images
```sh
docker push __backend_repository_url__:__tag__
docker push __static_repository_url__:__tag__
```

### Build EB archive
```sh
cd ./devops/deployment && make archive.zip tag=__tag__ BACKEND_REPO_URL=__backend_repository_url__ STATIC_REPO_URL=__static_repository_url__
```

### Re-deploy
```sh
cd ./devops/deployment && eb deploy
```
