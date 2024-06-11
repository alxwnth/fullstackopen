const CourseContentPart = ({ part }) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  );
};

export default CourseContentPart;
