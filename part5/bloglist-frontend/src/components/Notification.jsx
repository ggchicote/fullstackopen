const Notification = (props) => {
  if (props.notification === null) {
    return null
  }

  return (
    <div className={props.notification.type === 'error' ? 'error' : 'success'}>
      {props.notification.message}
    </div>
  )

}

export default Notification