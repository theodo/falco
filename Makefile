backend/install: .env
	docker-compose up -d
	docker-compose exec backend ./manage.py migrate
	docker-compose exec backend ./manage.py createcachetable

backend/start:
	docker-compose up

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
	docker-compose exec backend ./manage.py load_fixtures

frontend/install: frontend/.env
	yarn --cwd frontend install

frontend/start:
	yarn --cwd frontend start

.env: .env.example
	@if [ -f .env ]; \
	then\
		echo '\033[1;41m/!\ You already have created .env file. You should have a look at the .env.example file to ensure you have set all required environment variables for docker-compose.\033[0m';\
	else\
		echo cp .env.example .env;\
		cp .env.example .env;\
	fi

frontend/.env: frontend/.env.example
	@if [ -f frontend/.env ]; \
	then\
		echo '\033[1;41m/!\ You already have created a .env file for the frontend. You should have a look at the frontend/.env.example to ensure you have set all required environment variables to make the frontend work (this message will not be displayed again).\033[0m';\
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
