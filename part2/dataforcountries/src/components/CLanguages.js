import React from 'react'
import CLanguage from './CLanguage'

const CLanguages = ({languages}) => {
    return <>
        <ul>
            {Object.values(languages).map(language => <CLanguage key={language} language={language}/>)}
        </ul>
    </>
}

export default CLanguages