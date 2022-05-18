import React from "react";
const Filter = (props) => {
    return (
        <form>
            filter shown with
            <input 
            value={props.filter}
            onChange={props.handleSearchChange}
            />
        </form>
    )
}

export default Filter