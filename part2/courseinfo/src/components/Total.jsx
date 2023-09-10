
const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    console.log('what is happening', sum, part)
    return sum + part.exercises
  }, 0)
  return (
  <strong>Total Exercises: {total}</strong>
  )
}

export default Total