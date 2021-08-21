FROM ubuntu

RUN apt-get update && apt-get install -y nginx
COPY ./config/nginx/nginx.conf /etc/nginx/nginx.conf
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

EXPOSE 80

CMD service nginx start
