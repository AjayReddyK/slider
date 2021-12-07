import React from 'react';
import Converter from 'ppt-png'
import pptfile from '../ppts/samplepptx.pptx'

const Uploadpng = () => {
    const converter = Converter.create({
        files:[{pptfile}],
        output:'output/'
    });
    
    const result = converter.convert();
    return(
        console.log(result)
    )
};

export default Uploadpng;