FROM node 

EXPOSE 4000

WORKDIR graphql-server

RUN npm init --yes
RUN npm install --save apollo-server graphql graphql-tools apollo-datasource-rest lodash

COPY . .

ENTRYPOINT node index.js