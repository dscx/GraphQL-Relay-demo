"use strict";

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType
} = require("graphql");
const express = require("express");
const graphqlHTTP = require("express-graphql");

const { createVideo, getVideoById, getVideos } = require("./src/data/index");

const nodeInterface = require("./src/node");

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
  name: "Video",
  desciption: "A video on graph QL!",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
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
    released: {
      type: GraphQLBoolean,
      descirption: "Whether or not the video has been released"
    }
  },
  interfaces: [nodeInterface]
});
exports.videoType = videoType;

const queryTpe = new GraphQLObjectType({
  name: "QueryType",
  desciption: "The root query type",
  fields: {
    videos: {
      type: new GraphQLList(videoType),
      resolve: getVideos
    },
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

const videoInputType = new GraphQLInputObjectType({
  name: "VideoInput",
  fields: {
    title: {
      type: GraphQLString,
      descirption: "The title of the video."
    },
    duration: {
      type: GraphQLInt,
      descirption: "The duration of the video in seconds"
    },
    released: {
      type: GraphQLBoolean,
      descirption: "Whether or not the video has been released"
    }
  }
});

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "The root mutation type.",
  fields: {
    createVideo: {
      type: videoType,
      args: {
        video: {
          type: new GraphQLNonNull(videoInputType)
        }
      },
      resolve: (_, args) => {
        return createVideo(args.video);
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: queryTpe,
  mutation: mutationType
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
