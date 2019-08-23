import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onSubmitForm }) => {
    return (
        <div>
            <p className='f3'>
                {'Use the brain to detect faces in your pictures.'}
            </p>
            <div className='center'>
                <div className='form pa4 br3 shadow-5 center'>
                    <input 
                        onChange={onInputChange}
                        className='f4 pa2 w-70 center' 
                        type='text' />
                    <button
                        onClick={onSubmitForm}
                        className='w-30 grow f4 link ph3 pv2 dib white bg-dark-blue'>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm

