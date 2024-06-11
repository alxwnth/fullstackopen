import CourseContent from "./CourseContent";
import CourseHeader from "./CourseHeader";

const Course = ({ course }) => {
  return (
    <>
      <CourseHeader header={course.name} />
      <CourseContent parts={course.parts} />
    </>
  );
};

export default Course;
