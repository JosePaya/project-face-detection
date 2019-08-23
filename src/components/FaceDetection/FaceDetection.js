import React from 'react'
import './FaceDetection.css'

const FaceDetection = ({ imageURL, boxes }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='face-image' src={imageURL} alt='' width='500px' height='auto'></img>
                {
                    boxes.map(box => {
                        return (
                            <div
                                className='bounding-box'
                                style={
                                    { 
                                        top: box.top_row, 
                                        right: box.right_col, 
                                        bottom: box.bottom_row, 
                                        left: box.left_col 
                                    }
                                }
                            >
                            </div>
                        )
                    })
                }
                
            </div>
        </div>
    )
}

export default FaceDetection