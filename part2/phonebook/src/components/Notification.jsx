const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message.includes('information')) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  if (message.includes('deleted')) {
    return (
      <div className="delete">
        {message}
      </div>
    )
  }

   return (
    <div className='personAdd'>
      {message}
    </div>
  )
}

export default Notification