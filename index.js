'use strict';

const { graphql, buildSchema} = require('graphql');

const schema = buildSchema(`

type Video {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean,
}

type Query {
    video: Video    
}

type Schema {
    query: Query
}
`);

const resolvers = {
    video: () => ({
        title: 'bar',
        id: '1',
        duration: 180,
        watched: true,
    })
};

const query = `
query myFirstQuery {
    video {
        title
        id
        duration
        watched
    }
}
`;

graphql(schema, query, resolvers)
.then((result) => console.log(result))
.catch((error) => console.log(error));
