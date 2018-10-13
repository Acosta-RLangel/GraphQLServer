# GraphQLServer
Tinkering with GraphQLServer

simple GraphQL server exposing a small collection of books.

Includes a Dockerfile which will allow the server to be deployed in a container.

build and run 

docker build -t graphqlsvrimg .

docker build -dtp 4000:4000 --name graphqlsvr graphqlsvrimg 

http://localhost:4000 will then get to the playground


The index.js file can also be deployed to a function app in Azure (haven't done this yet though)
