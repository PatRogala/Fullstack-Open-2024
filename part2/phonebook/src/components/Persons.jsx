const Persons = ({ persons, filter, handleDelete }) => {
    return (
        <div>
            {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => 
                <div key={person.name}>
                    <p>{person.name} {person.number}
                        <button onClick={() => handleDelete(person.id)}>delete</button>
                    </p>
                </div>
            )}
        </div>
    )
}

export default Persons