FROM node:4-slim
RUN mkdir -p /service
ADD package.json /service
WORKDIR /service
RUN cd /service && npm install -g npm@latest-2
RUN cd /service && npm install
ADD app.js /service/
EXPOSE  10001
CMD ["node","/service/app.js"]
