import React, {useState} from 'react'

import "./css/Card.css"

const Card = ({editable}) => {
    const [edited, setEdited] = useState(false)
    const handleEditClick = () => {
        setEdited(true)
    }
    const handleCancelClick = () => {
        setEdited(false)
    }
    const handleConfirmClick = () => {
        setEdited(false)
    }
    return (
        <div className="card">

            {editable && !edited ? <i className="fa fa-pencil-square-o edit-icon" aria-hidden="true" onClick={handleEditClick}></i> : <></>}
            {editable && edited ? <><i class="fa fa-times cancel-icon" onClick={handleCancelClick}></i>
             <i class="fa fa-check confirm-icon" onClick={handleConfirmClick}></i></> : <></>}
        </div>
    );
}

export default Card;
