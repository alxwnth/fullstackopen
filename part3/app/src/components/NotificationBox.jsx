const NotificationBox = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className={`message ${message.isError ? "error" : "info"}`}>
      {message.text}
    </div>
  );
};

export default NotificationBox;
