import React from 'react'

type NotificationProp = {
    type: boolean
    text: string
    isShown: boolean
}

export default function Notifications({type,text,isShown}: NotificationProp) {
    return (
        <div className={`p-10 border rounded-2xl
            ${type ? 'bg-green-500 border-green-800' : ' bg-rose-500 border-red-900'}
            
        `}>
            <span className='text-white text-2xl'>{text} </span>
        </div>
    )
}
