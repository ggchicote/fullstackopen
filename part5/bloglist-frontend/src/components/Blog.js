import ShowDetail from '../components/ShowDetail'
import BlogDetails from '../components/BlogDetails'

const Blog = (props) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} id='blog' className='blog'>
      <span id='blog-title'>
        {props.blog.title}
      </span>
      {' '}
      <ShowDetail>
        <BlogDetails blog={props.blog} updateLikes={props.updateLikes} removeBlog={props.removeBlog} />
      </ShowDetail>
    </div>
  )
}


export default Blog