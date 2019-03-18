"use strict";

const { graphql, buildSchema } = require("graphql");

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
  video: () => ({
    title: "bar",
    id: "1",
    duration: 180,
    watched: true
  }),
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

const query = `
query myFirstQuery {
    videos {
        title
        id
        duration
        watched
    }
}
`;

graphql(schema, query, resolvers)
  .then(result => console.log(result))
  .catch(error => console.log(error));
