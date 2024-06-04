import Part from "./Part";

const Content = ({
  part1,
  part2,
  part3,
  exercises1,
  exercises2,
  exercises3,
}) => {
  return (
    <>
      <Part partName={part1} exercises={exercises1} />
      <Part partName={part2} exercises={exercises2} />
      <Part partName={part3} exercises={exercises3} />
    </>
  );
};

export default Content;
