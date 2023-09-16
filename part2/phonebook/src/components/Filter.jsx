const Filter = ({filter, handleFilterChange}) => {
  return (
    <p>
          Looking for someone?
          <input
            value={filter}
            onChange={handleFilterChange}
          />
      </p>
  )
}

export default Filter