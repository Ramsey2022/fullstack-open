const Person = ({ person, removePerson }) => {
  return(
    <ul>
      {person.name}: {person.number} 
      <br></br>
      <button onClick={() => removePerson(person.id, person.name)}>Delete</button>
    </ul>
  )
}

export default Person