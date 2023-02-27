const BlogDetails = (props) => {

  const removeButtonStyle = {
    backgroundColor: 'blue',
    borderWidth: 0,
    borderRadius: 3,
    marginBottom: 2
  }

  return (
    <div>
      <div className='url'>{props.blog.url}</div>
      <div>
        <span className='likes'>{props.blog.likes}</span>
        {' '}
        <button id='like-button' onClick={() => { props.updateLikes(props.blog) }}>like</button>
      </div>
      <div className='author'>{props.blog.author}</div>
      <button id='remove' style={removeButtonStyle} onClick={() => props.removeBlog(props.blog)}>remove</button>
    </div>
  )

}

export default BlogDetails