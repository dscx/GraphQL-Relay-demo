"use strict";

const { graphql, buildSchema } = require("graphql");
const express = require("express");
const graphqlHTTP = require("express-graphql");

const PORT = process.env.PORT || 3000;
const server = express();

const schema = buildSchema(`

type Video {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean,
}

type Query {
    video: Video
    videos: [Video]
}

type Schema {
    query: Query
}
`);

const resolvers = {
  videos: () => videos
};

const videoA = {
  title: "Create a GraphQL Schema",
  id: "a",
  duration: 180,
  watched: true
};

const videoB = {
  title: "Create a GraphQL Schema",
  id: "b",
  duration: 380,
  watched: false
};

const videos = [videoA, videoB];

server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: resolvers
  })
);

server.listen(PORT, () => {
    console.log(`Listening on http://localhos:${PORT}`);
})
