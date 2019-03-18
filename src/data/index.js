const videoA = {
  title: "Create a GraphQL Schema",
  id: "a",
  duration: 180,
  watched: true
};

const videoB = {
  title: "React JS Crash Course",
  id: "b",
  duration: 380,
  watched: false
};

const videos = [videoA, videoB];

const getVideoById = id =>
  new Promise(resolve => {
    const [video] = videos.filter(video => {
      return video.id === id;
    });

    resolve(video);
  });

const getVideos = () =>
  new Promise(resolve => {
    resolve(videos);
  });

exports.getVideoById = getVideoById;
exports.getVideos = getVideos;
