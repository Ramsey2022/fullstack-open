const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='personAdd'>
      {message}
    </div>
  )
}

export default Notification