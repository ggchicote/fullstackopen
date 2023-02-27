const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((sum, current) => sum + current.likes, 0)
  return totalLikes
}

const favoriteBlog = (blogs) => {
  const max = blogs.reduce((a, b) => Math.max(a, b.likes), -Infinity)
  const returnedFavorite = blogs.find(b => b.likes === max)

  if (returnedFavorite) {
    delete returnedFavorite._id
    delete returnedFavorite.__v
    delete returnedFavorite.url

    return returnedFavorite
  }

  return null

}

const mostBlogs = (blogs) => {

  if (!blogs || blogs.length === 0) return null

  const blogsByAuthor = _.countBy(blogs, 'author')
  const totalBlogsByAuthor = _.map(blogsByAuthor,(value,key) => ({
    author: key,
    blogs: value
  }))
  const max = _.maxBy(totalBlogsByAuthor,'blogs')
  return max

}

const mostLikes = (blogs) => {

  if (!blogs || blogs.length === 0) return null
  const groupedByAuthor =_.groupBy(blogs,'author')
  const sumByLikes = _.map(groupedByAuthor, (objs, key) => ({
    'author': key,
    'likes': _.sumBy(objs, 'likes') }))
  const max = _.maxBy(sumByLikes,'likes')

  return max
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}