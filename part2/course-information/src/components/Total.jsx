const Total = ({ course }) => {
  return (
    <b>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>
  )
}

export default Total