import Part from "./Part";

const Content = ({ course }) => {
  return (
    <>
      <Part
        partName={course.parts[0].name}
        exercises={course.parts[0].exercises}
      />
      <Part
        partName={course.parts[1].name}
        exercises={course.parts[1].exercises}
      />
      <Part
        partName={course.parts[2].name}
        exercises={course.parts[2].exercises}
      />
    </>
  );
};

export default Content;
