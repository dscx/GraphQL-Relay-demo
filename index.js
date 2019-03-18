"use strict";

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require("graphql");
const express = require("express");
const graphqlHTTP = require("express-graphql");

const { getVideoById } = require("./src/data/index");

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
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: "The ID of the video."
        }
      },
      resolve: (_, args) => {
        return getVideoById(args.id);
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: queryTpe
});

server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
