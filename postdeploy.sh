if [[ -z "${IS_REVIEW_APP}" ]]; then
    ./manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', '$EMAIL_ADMIN', 'admin')"
    ./manage.py populate-periodic-tasks
else
    ./manage.py loaddata fixtures/fixtures.json
fi