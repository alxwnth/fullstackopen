import CourseContentPart from "./CourseContentPart";

const CourseContent = ({ parts }) => {
  return (
    <ul>
      {parts.map((part) => (
        <CourseContentPart part={part} key={part.id} />
      ))}
    </ul>
  );
};

export default CourseContent;
