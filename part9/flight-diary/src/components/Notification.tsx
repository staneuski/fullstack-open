const Notification = ({ message }: { message: string }) => {
  const style = { color: "red", border: "solid", padding: 10, borderWidth: 1 };
  return message && <div style={style}>{message}</div>;
};

export default Notification;
