import { useState } from 'react'

const ShowDetail = (props) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <>
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      <div style={{ display: visible ? '' : 'none' }} className='blogDetail'>
        {props.children}
      </div>
    </>
  )
}

export default ShowDetail