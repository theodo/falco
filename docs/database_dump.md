# How to dump production database in local
This is a turorial to get current production database and copy it so we can access it when running in local during development. This is to have development data as close as possible to production data. Our server is setup on AWS.

## Change production database settings
On AWS, go to RDS then databases and select production database of your application (`falco-production`).
Click on `Modify`.
In the section `VPC Security Group`, add the staging group (`falco-staging-database`), and check `Yes` to authorize public access. Validate, it will now show you the changes you want to apply (there should only be these two), select that you want to apply them immmediately. Apply changes, it will redirect you to the database page. Wait for changes to be applied.

## Connect local computer to remote production database
This part should only be done the first time. The other times, you only need to synchronize the database.

If you don't have it yet, download [Datagrip](https://www.jetbrains.com/datagrip/download).

Go to `File/Data Sources` and add a Postgres database. Fill in the Host and Port from the RDS database page (on the left). You can find your Username and password from your environment variables: go back to Elastic Beanstalk and select production app. Go to config/Applications (logiciels) and click `Modify`. Find the variable called `DATABASE_URL`, it's in the format `postgres://[username]:[password].[all_the_rest]`.

Test your connection, download drivers if needed, and you're done ! You now have access to the production database from Datagrip.

## Copy databases
Enter your database: `databases/postgres/schemas/public/tables`. Select needed tables. You might want to select them in the order in which you will need to add them, as the export will be in that order. For Falco, the nedded bases are the ones in the `initial_dump.sql` script, in the same order. Then with a right clik, in `Dump Data to File` select `Single File`, `Skip computed columns` and `Overwrite existing files`. Then in the same menu, click `SQL Insert`. It will generate a SQL file.

## Cut access to production database
As we allowed access to production database, now that we have needed data, we need to cut the access ! Just revert the steps to restore to initial settings.

Try to synhronize the database in DataGrip, it should send you a connection error.

## Finalize SQL script
Before using the SQL script, you need to clean it a bit. Add TRUNCATE for all tables at the beggining, to erase all previous data.

For all scripts, as they are crypted, you need to remove crypted scripts and replace them with the script from `initial_dump.sql`.

## Update local database
In your local database, right click and select `Run SQL script`, with the script you just generated!

When running the app in localhost you have now access to recent production data.