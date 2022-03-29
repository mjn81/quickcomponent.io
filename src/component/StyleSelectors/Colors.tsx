import React from 'react'
import {useDispatch} from 'react-redux'
import {applyStyle} from '../../redux/slice'
import ColorPicker from '../ColorPicker'

const Colors = () => {
    const dispatch = useDispatch()

    return (
        <>
            <ColorPicker
                name='Color'
                onChange={value => 
                    dispatch(applyStyle({
                        key: 'color',
                        value: value 
                    }))
                }
            />
            <ColorPicker
                name='Background color'
                allowGradient
                onChange={value => 
                    dispatch(applyStyle({
                        key: 'backgroundColor',
                        value: value 
                    }))
                }
            />
        </>
    )
}

export default Colors 