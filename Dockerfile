FROM node:12-slim

# mecabの導入
RUN apt-get update \
    && apt-get install -y \
    mecab \
    libmecab-dev \
    mecab-ipadic-utf8

WORKDIR /src