const Button = ({ handlerFunction, text }) => {
  return <button onClick={handlerFunction}>{text}</button>;
};

export default Button;
