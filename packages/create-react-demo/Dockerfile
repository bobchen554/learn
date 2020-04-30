FROM docker-inter.zaihui.com.cn/fe/inf/basic-images/ci-base

COPY . /kylin
WORKDIR /kylin
RUN rm -rf packages/**/src
RUN lerna bootstrap
