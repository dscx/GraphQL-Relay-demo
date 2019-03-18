# Sample GraphQL Server using Relay

## Setup

#### 1.  Install dependencies

```sh
$ yarn
```

#### 2. Run the app

```sh
$ node index.js
```

> [http://localhost:3000/graphql](http://localhost:3000/graphql) — Graphiql UI

## Sample Queries
#### Video Count
```
{
 videos {
 	totalCount
 } 
}
```
#### First Video
```
{
  videos(first:1) {
    edges {
      node {
        id
      }
    }
  }
}
```

#### Last Video
```
{
  videos(last:1) {
    edges {
      node {
        id
      }
    }
  }
}
```
#### All Videos
```
{
  videos {
    edges {
      node {
        title,
        duration,
        released,
        id
      }
    }
  }
}
```
#### Add Video
```
mutation addVideoQuery($input: AddVideoInput!) {
  createVideo(input: $input) {
    video {
      title
    }
  }
}

/* Query Variables */

{
  "input": {
   	"title": "Teenage Mutant Ninja Video",
    "duration": 400,
    "released": true,
    "clientMutationId": "ldrm"
  }
}
```