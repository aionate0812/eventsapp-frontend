import React from 'react'

const FollowerCard = (props) => {
    return(
        <>
        <p>{props.user.data.username}</p>
        <p>{props.user.data.avatar}</p>
        </>
    )
}

export default FollowerCard