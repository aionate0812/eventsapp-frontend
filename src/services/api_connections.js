import axios from 'axios'

const root = 'http://localhost:5000'
const userEndpointBase = '/user/'
const followersEndpointBase= '/followers/'
const interestsEndpointBase = '/interests/'
const eventbriteEndpointBase = '/eventbrite/'
const eventsEndpointBase = '/events/'
const userEventEndpointBase = '/user_events/'
const likesEndpointBase = '/likes/'

const createUser = (body={}) => {
    console.log('inside createUser')
    return axios({
        url:userEndpointBase,
        method:'post',
        baseURL:root,
        data:body
    })
}

const getUser = (body) => {
    return axios({
        url:userEndpointBase,
        method:'get',
        baseURL:root,
        params:body
    })
}

const getFollowers = (user_id) => {
    return axios({
        url:`${followersEndpointBase}count/${user_id}`,
        method:'get',
        baseURL:root,
    })
}

const getInterests = () => {
    return axios({
        url:interestsEndpointBase,
        method:'get',
        baseURL:root
    })
}

const getEventbriteSubcategories = (subcategory) => {
    return axios({
        url:`${eventbriteEndpointBase}${subcategory}`,
        method:'get',
        baseURL:root,
    })
}

const createEvent = (body) => {
    return axios({
        url:`${eventsEndpointBase}`,
        method:'post',
        baseURL:root,
        data:body
    })
}

const createUserEvent = (user_id,event_id) => {
    return axios({
        url:`${userEventEndpointBase}`,
        method:'post',
        baseURL:root,
        data:{user_id,event_id}

    })
}

const getUserEvent = (user_id,event_id) => {
    return axios({
        url:`${userEventEndpointBase}`,
        method:'get',
        baseURL:root,
        params:{user_id,event_id}
    })
}

const getEvent = (eventbrite_id, event_id, id) => {
    return axios({
        url:`${eventsEndpointBase}`,
        method:'get',
        baseURL:root,
        params:{eventbrite_id,event_id,id}
    })
} 

const getUsers = () => {
    return axios({
        url:`${userEndpointBase}users/`,
        method:'get',
        baseURL:root
    })
}

const getUserByUsername = (username) => {
    return axios({
        url:`${userEndpointBase}${username}`,
        method:'get',
        baseURL:root
    })
}

const getUserById = (id) => {
    return axios({
        url:`${userEndpointBase}user/${id}`,
        method:'get',
        baseURL:root
    })
}

const getUserEvents = (user_id) => {
    return axios({
        url:`${userEventEndpointBase}${user_id}`,
        method:'get',
        baseURL:root
    })
}

const isFollowing = (follower_id, being_followed_id) => {
    return axios({
        url:`${followersEndpointBase}follower/${follower_id}`,
        method:'get',
        baseURL:root,
        params:{
            being_followed_id
        }
    })
}

const follow = (follower_id, followed_user_id) => {
    return axios({
        url:`${followersEndpointBase}${follower_id}`,
        method:'post',
        baseURL:root,
        data:{followed_user_id}
    })
}

const getFollowersList = (user_id, getFollowing, getFollowers ) => {
    return axios({
        url:`${followersEndpointBase}${user_id}`,
        method:'get',
        baseURL:root,
        params:{getFollowing,getFollowers}
    })
}

const getLikesCount = (event_id) => {
    return axios({
        url:`${likesEndpointBase}count/${event_id}`,
        method:'get',
        baseURL:root,
    })
}
export {
    createUser,
    getUser,
    getFollowers,
    getInterests,
    getEventbriteSubcategories,
    createEvent,
    createUserEvent,
    getUserEvent,
    getEvent, 
    getUsers,
    getUserByUsername,
    getUserEvents,
    isFollowing,
    follow,
    getFollowersList,
    getUserById,
    getLikesCount
}
