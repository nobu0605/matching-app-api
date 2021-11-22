From ubuntu:20.04
ENV APP_ROOT /app/

WORKDIR $APP_ROOT

RUN apt-get update && apt-get install curl vim -y
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install nodejs -y
COPY package*.json $APP_ROOT
RUN npm install

COPY . $APP_ROOT