const videoA = {
  title: "Create a GraphQL Schema",
  id: "a",
  duration: 180,
  released: true
};

const videoB = {
  title: "React JS Crash Course",
  id: "b",
  duration: 380,
  released: false
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

const createVideo = ({ title, duration, released }) => {
  const video = {
    id: new Buffer(title, "utf8").toString("base64"),
    title,
    duration,
    released
  };

  videos.push(video);
  return video;
};

const getObjectById = (type, id) => {
  const types = {
    video: getVideoById
  };

  return types[type](id);
};

exports.getVideoById = getVideoById;
exports.getVideos = getVideos;
exports.createVideo = createVideo;
exports.getObjectById = getObjectById;
