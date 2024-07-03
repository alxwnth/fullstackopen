const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => (sum += blog.likes), 0);
};

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
  const favoriteBlog = blogs.find((blog) => blog.likes === maxLikes);
  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  const countByBlogs = _.countBy(blogs, (blog) => blog.author);
  const mostBloggedName = _.maxBy(
    Object.keys(countByBlogs),
    (c) => countByBlogs[c]
  );
  return {
    author: mostBloggedName,
    blogs: countByBlogs[mostBloggedName],
  };
};

const mostLikes = (blogs) => {
  const authorGroups = _.groupBy(blogs, (blog) => blog.author);
  let likeGroups = [];
  _.forEach(authorGroups, (group, author) => {
    likeGroups.push({
      author: author,
      likes: _.reduce(group, (result, value) => (result += value.likes), 0),
    });
  });
  return _.maxBy(likeGroups, (group) => group.likes);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
