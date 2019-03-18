"use strict";

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLID,
  GraphQLString
} = require("graphql");

const express = require("express");
const graphqlHTTP = require("express-graphql");

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
  name: "Video",
  desciption: "A video on graph QL!",
  fields: {
    id: {
      type: GraphQLID,
      descirption: "The id of the video."
    },
    title: {
      type: GraphQLString,
      descirption: "The title of the video."
    },
    duration: {
      type: GraphQLInt,
      descirption: "The duration of the video in seconds"
    },
    watched: {
      type: GraphQLBoolean,
      descirption: "Whether or not the video has been watched by the viewer"
    }
  }
});

const queryTpe = new GraphQLObjectType({
  name: "QueryType",
  desciption: "The root query type",
  fields: {
    video: {
      type: videoType,
      resolve: () =>
        new Promise(resolve => {
          resolve({
            id: "a",
            title: "GraphQL",
            duration: 180,
            watched: true
          });
        })
    }
  }
});

const schema = new GraphQLSchema({
  query: queryTpe,
//   mutation,
//   subsciption
});

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
    graphiql: true
  })
);

server.listen(PORT, () => {
  console.log(`Listening on http://localhos:${PORT}`);
});
