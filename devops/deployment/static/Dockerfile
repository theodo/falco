# First stage: collect static files in base image
FROM falco/base AS python

# Second stage: static files server
FROM nginx:1.15

# Custom config
RUN rm /etc/nginx/conf.d/default.conf
COPY ./static/nginx.conf /etc/nginx/conf.d/Falco.conf

COPY --from=python /code/static /static
