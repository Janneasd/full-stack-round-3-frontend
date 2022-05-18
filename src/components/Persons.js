import ShowAll from "./Person"
import React from "react";

const Persons = (props) => {
    return (
        <ul>
         {props.persons.filter(index => index.content && index.content.includes(props.filter)).map(object =>  (
            <ShowAll key={object.id} name={object.content} number={object.number} removePerson={props.handleRemovePerson(object.name, object.id)}/>
         ))}
        </ul>
    )
}

export default Persons