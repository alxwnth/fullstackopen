import CourseContentPart from "./CourseContentPart";
import CourseTotal from "./CourseTotal";

const CourseContent = ({ parts }) => {
  return (
    <>
      <ul>
        {parts.map((part) => (
          <CourseContentPart part={part} key={part.id} />
        ))}
      </ul>
      <CourseTotal
        total={parts.reduce((sum, part) => sum + part.exercises, 0)}
      />
    </>
  );
};

export default CourseContent;
