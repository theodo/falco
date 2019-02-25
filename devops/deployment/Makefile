BASE_IMAGE_TAG="falco/base:latest"
BACKEND_IMAGE_TAG="falco/backend:latest"
CELERY_WORKER_IMAGE_TAG="falco/celeryworker:latest"
CELERY_BEAT_IMAGE_TAG="falco/celerybeat:latest"
STATIC_IMAGE_TAG="falco/static:latest"
TMP_SRC=.src/

ARCHIVE_TARGET=./archive.zip
TMP_ARCHIVE_DIR=.archive/

define copy_source
	rsync -a ../../backend $1 --exclude "*.pyc" --exclude __pycache__
	rsync -a ../../frontend $1 --exclude node_modules --exclude "*.test.js"
endef

define docker_build
	docker build --tag $2 --file $1 $3 .
	@echo "🐳  Docker image \033[1;44m $2 \033[0m built"
endef

.PHONY: images base backend_image clean

images: clean backend_image celeryworker_image celerybeat_image static_image clean

base: $(TMP_SRC)
	$(call docker_build,base/Dockerfile,$(BASE_IMAGE_TAG))

backend_image: base
	$(call docker_build,backend/Dockerfile,$(BACKEND_IMAGE_TAG))

celeryworker_image: base
	$(call docker_build,celeryworker/Dockerfile,$(CELERY_WORKER_IMAGE_TAG))

celerybeat_image: base
	$(call docker_build,celerybeat/Dockerfile,$(CELERY_BEAT_IMAGE_TAG))

static_image: base
	$(call docker_build,static/Dockerfile,$(STATIC_IMAGE_TAG))

$(TMP_SRC):
	mkdir -p $(TMP_SRC)
	$(call copy_source,$(TMP_SRC))

$(ARCHIVE_TARGET): $(TMP_ARCHIVE_DIR)
	cd $(TMP_ARCHIVE_DIR) && zip "../$(ARCHIVE_TARGET)" -q -r .

$(TMP_ARCHIVE_DIR):
	mkdir -p $(TMP_ARCHIVE_DIR)
	sed 's:BACKEND_REPO_URL:$(BACKEND_REPO_URL):; s:CELERY_WORKER_REPO_URL:$(CELERY_WORKER_REPO_URL):; s:CELERY_BEAT_REPO_URL:$(CELERY_BEAT_REPO_URL):; s:STATIC_REPO_URL:$(STATIC_REPO_URL):; s:TAG:$(tag):' Dockerrun.aws.json > $(TMP_ARCHIVE_DIR)/Dockerrun.aws.json
	cp -r .ebextensions $(TMP_ARCHIVE_DIR)

clean:
	rm -rf $(TMP_SRC) $(TMP_ARCHIVE_DIR)
