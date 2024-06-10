import Button from "./Button";

const RatingButtons = ({ handleActions }) => {
  return (
    <>
      <h2>give feedback</h2>
      <Button handlerFunction={handleActions[0]} text={"good"} />
      <Button handlerFunction={handleActions[1]} text={"neutral"} />
      <Button handlerFunction={handleActions[2]} text={"bad"} />
    </>
  );
};

export default RatingButtons;
