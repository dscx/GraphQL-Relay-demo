"use strict";

const { nodeDefinitions, fromGlobalId } = require("graphql-relay");
const { videoType } = require("../index");
const { getObjectById } = require("./data");

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);
    return getObjectById(type.toLowerCase(), id);
  },
  object => {
    if (object.title) {
      const { videoType } = require('../')
      return videoType;
    }
    return null;
  }
);

exports.nodeInterface = nodeInterface;
exports.nodeField = nodeField;
