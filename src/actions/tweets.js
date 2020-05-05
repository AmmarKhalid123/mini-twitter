import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading} from 'react-redux-loading'

export const ADD_TWEET = 'ADD_TWEET'
export const RECIEVE_TWEETS  = 'RECIEVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'

export function addTweet (tweet) {
    return {
        type: ADD_TWEET,
        tweet
    }
}

export const handleAddTweet = (text, replyingTo) => (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveTweet({
        text,
        author: authedUser,
        replyingTo
    })
    .then((tweet) => dispatch(addTweet(tweet)))
    .then(() => dispatch(hideLoading()))

}


export function recieveTweets (tweets) {
    return {
        type: RECIEVE_TWEETS,
        tweets,
    }
}

function toggleTweet ({id, authedUser, hasLiked }) {
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}

export function handleToggleTweet (info) {
    return (dispatch) => {
        dispatch(toggleTweet(info))
        
        return saveLikeToggle(info)
        .catch((e) => {
            console.warn('Error in hangleToggleTweet: ', e)
            dispatch(toggleTweet(info))
            alert('There was an error liking the tweet, try again')
        })     
    }   
}