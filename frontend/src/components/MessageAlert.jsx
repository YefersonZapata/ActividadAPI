const MessageAlert = ({ message, variant = 'success' }) => {
  if (!message) return null

  return <div className={`alert alert-${variant}`} role="alert">{message}</div>
}

export default MessageAlert
