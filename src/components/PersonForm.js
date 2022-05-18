import React from "react";
const PersonForm = ( props ) => {
    return (
     <form onSubmit={props.addPerson}>
         name: <input value={props.newName}
         onChange={props.onChangeName}
         />
         number: <input value={props.newNumber}
         onChange={props.onChangeNumber}
         />
         <button type="submit"> add </button>
     </form>
    
    )
  }
  
  export default PersonForm