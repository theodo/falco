backend/install: .env
	TMPDIR=/private$$TMPDIR docker-compose up -d
	docker-compose exec backend ./manage.py migrate
	docker-compose exec backend ./manage.py createcachetable

backend/start:
	TMPDIR=/private$$TMPDIR docker-compose up

backend/migrate:
	docker-compose exec backend ./manage.py migrate

backend/createsuperuser:
	docker-compose exec backend ./manage.py createsuperuser

backend/makemigrations:
	docker-compose exec backend ./manage.py makemigrations

backend/shell:
	docker-compose exec backend ./manage.py shell

db/connect:
	docker exec -it falco_db_1 psql -Upostgres postgres

fixtures/load:
	docker-compose exec backend ./manage.py loaddata fixtures/fixtures.json

frontend/install: frontend/.env
	yarn --cwd frontend install

frontend/start:
	yarn --cwd frontend start

.env: .env.example
	@if [ -f .env ]; \
	then\
		echo '\033[1;41m/!\ The .env.example file has changed. Please check your .env file (this message will not be displayed again).\033[0m';\
		touch .env;\
		exit 1;\
	else\
		echo cp .env.example .env;\
		cp .env.example .env;\
	fi

frontend/.env: frontend/.env.example
	@if [ -f frontend/.env ]; \
	then\
		echo '\033[1;41m/!\ The frontend/.env.example file has changed. Please check your frontend/.env file (this message will not be displayed again).\033[0m';\
		touch frontend/.env;\
		exit 1;\
	else\
		echo cp frontend/.env.example frontend/.env;\
		cp frontend/.env.example frontend/.env;\
	fi

hook:
	chmod +x hooks/pre-commit
	ln -s -f ../../hooks/pre-commit .git/hooks/pre-commit

install:
	make hook
	make frontend/install
	make backend/install
