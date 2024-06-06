import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <>
      <Part partName={parts[0].name} exercises={parts[0].exercises} />
      <Part partName={parts[1].name} exercises={parts[1].exercises} />
      <Part partName={parts[2].name} exercises={parts[2].exercises} />
    </>
  );
};

export default Content;
