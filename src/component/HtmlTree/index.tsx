import { nanoid } from '@reduxjs/toolkit'
import { Tree } from 'antd'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { moveElementInTree, changeSelectedElement, updateTreeInputValue, clearInputAtKey } from '../../redux/slice'
import Action from './Action'
import { toggleElementsDrawer } from '../../redux/ui'
import Drawer from './Drawer'
import { type } from 'os'


function formatData(html) {
    html.map((item, index) => {
        if (Array.isArray(item.children)) {
            formatData(item.children)
            item.icon = <Action elementKey={item.key} />
        }

        else if (item.text) {
            item.title = item.text
            delete item.text
        }
    })
    return html
}

const Title = (props: {data: any}) => {
    const dispatch = useDispatch()
    // @ts-ignore
    const inputAtKey = useSelector(state => state.html.inputKey)
    const {data} = props 
    
    const handleChange = (e) => {
        const value = e.target.value  
        dispatch(updateTreeInputValue({
            value
        }))
    }

    const claerInputAtKey = () => {
        dispatch(clearInputAtKey())
    }

    if(data.key === inputAtKey)
        return (
            <>
                <input  onChange={handleChange}  />
                <button onClick={claerInputAtKey}>Okay</button>    
            </>
        )

    return (
        <span>{data.title}</span>
    )
}


const HtmlTree: React.ReactNode = () => {
    const dispatch = useDispatch()
    //@ts-ignore
    let html = useSelector(state => state.html.map)
    //@ts-ignore
    let showHtmlList = useSelector(state => state.ui.showElementDrawer)
    html = formatData(JSON.parse(JSON.stringify(html)))

    const handleElementsDragAndDrop = (info) => {

        const { key: dragKey } = info.dragNode
        const { key: dropKey } = info.node
        const { dropPosition, dropToGap } = info

        dispatch(moveElementInTree({
            dragKey,
            dropKey,
            dropPosition,
            dropToGap
        }))
    }

    const handleElementSelect = (value) => {
        if(value.length != 0)
            dispatch(changeSelectedElement({ key: value[0] }))
    }

    const toggleDrawer = () => {
        dispatch(toggleElementsDrawer())
    }

    return (
        <div className='html-tree site-drawer-render-in-current-wrapper'>
            <Drawer/>
            <Tree
                showIcon={true}
                showLine={true}
                treeData={html}
                draggable
                onDrop={handleElementsDragAndDrop}
                onSelect={handleElementSelect}  
                titleRender={nodeData => <Title data={nodeData} />}
            />
           
        </div>
    )
}

export default HtmlTree 