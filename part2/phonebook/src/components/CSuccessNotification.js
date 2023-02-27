import React from 'react'

const CSuccessNotification = ({message}) => {
    if (message === null){
        return null
    }
    
    return (
        <div className="success">
            {message}
        </div>
    )

}

export default CSuccessNotification