import React, {useState} from 'react'

import "./css/Card.css"

const Card = ({editable, content, handleEdition, handleConfirmEdition}) => {
    const [edited, setEdited] = useState(false)
    const handleEditClick = () => {
        setEdited(true)
        handleEdition(true)
    }
    const handleCancelClick = () => {
        setEdited(false)
        handleEdition(false)
    }
    const handleConfirmClick = async () => {
        if(await handleConfirmEdition()){
            setEdited(false)
            handleEdition(false)
        }
    }
    return (
        <div className="card">

            {editable && !edited ? <i className="fa fa-pencil-square-o edit-icon" aria-hidden="true" onClick={handleEditClick}></i> : <></>}
            {editable && edited ? <><i className="fa fa-times cancel-icon" onClick={handleCancelClick}></i>
             <i className="fa fa-check confirm-icon" onClick={handleConfirmClick}></i></> : <></>}
             {content}
        </div>
    );
}

export default Card;
