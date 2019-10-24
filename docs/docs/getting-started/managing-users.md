---
id: managing-users
title: Managing Users
sidebar_label: Managing Users
---

## Falco User roles

There are 3 different roles in Falco:

- _User_: Users can access, though not modify, the projects they are a member of, including all the audits results for the project;
- _Project Admin_: Project Admin can do as much as Users, and in addition can modify the projects for which they are admins in the `Project Settings` page;
- _Super Admin_: Super Admins can do as much as Project Admins for all projects, and in addition can connect to the Django Admin interface. Super Admins have all rights on all entities on the Falco instance.

## Creating a User account

There are two ways to create a User account in Falco:

- Head to `<your Falco instance URL>/sign-up` and sign up;
- As a Super Admin, connect to the admin interface at `/admin/` (the trailing slash is important), then head to `Users` > `Add User`.

## Managing the users of a project as a Project Admin

As a Project Admin, you can add, remove, promote and demote other members of a project in Falco’s interface. To do so:

1. Click the `Manage project settings →` link in the left-hand menu of a project’s Audit view;
2. Click on the `Project member` tab in the left-hand menu;
3. You can then add, delete, promote a member to be a Project Admin or demote one.

![Managing users in a project](/img/users.png)

## Managing all users as a Super Admin

As a Super Admin, you have all the rights on all the users. To create, delete, promote or demote any user, you can connect to the admin interface at `/admin/` (the trailing slash is important), then head to `Users`.

Please remember that [“with great power comes great responsibility”](https://youtu.be/b23wrRfy7SM).