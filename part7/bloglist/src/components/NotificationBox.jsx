import { useSelector } from "react-redux";

const NotificationBox = () => {
  const message = useSelector((state) => state.notification);

  if (message === "") {
    return null;
  }

  return (
    <div className={`message ${message.isError ? "error" : "info"}`}>
      {message.text}
    </div>
  );
};

export default NotificationBox;
