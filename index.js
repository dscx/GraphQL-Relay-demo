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
const {
  globalIdField,
  connectionDefinitions,
  connectionFromPromisedArray,
  connectionArgs,
  mutationWithClientMutationId
} = require("graphql-relay");

const { createVideo, getVideoById, getVideos } = require("./src/data/index");

const { nodeInterface, nodeField } = require("./src/node");

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
  name: "Video",
  desciption: "A video on graph QL!",
  fields: {
    id: globalIdField(),
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

const { connectionType: VideoConnection } = connectionDefinitions({
  nodeType: videoType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: "Total count of the objects in this connection.",
      resolve: conn => {
        return conn.edges.length;
      }
    }
  })
});

const queryTpe = new GraphQLObjectType({
  name: "QueryType",
  desciption: "The root query type",
  fields: {
    node: nodeField,
    videos: {
      type: VideoConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(getVideos(), args)
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

const videoMutation = mutationWithClientMutationId({
  name: "AddVideo",
  inputFields: {
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
  outputFields: {
    video: {
      type: videoType
    }
  },
  mutateAndGetPayload: args =>
    new Promise((resolve, reject) => {
      Promise.resolve(createVideo(args))
        .then(video => resolve({ video }))
        .catch(reject);
    })
});

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "The root mutation type.",
  fields: {
    createVideo: videoMutation
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
