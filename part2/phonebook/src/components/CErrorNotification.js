import React from 'react'

const CErrorNotification = ({message}) => {
    if (message === null){
        return null
    }
    
    return (
        <div className="error">
            {message}
        </div>
    )

}

export default CErrorNotification