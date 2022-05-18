import React from "react";
const ShowAll = (props) => {

    return (
        <div>
                {props.name} {props.number} <button onClick={props.removePerson}>Delete</button>
        </div>
    )
}

export default ShowAll