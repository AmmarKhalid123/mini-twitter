import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { TiArrowBackOutline } from 'react-icons/ti/index'
import { TiHeartOutline } from 'react-icons/ti/index'
import { TiHeartFullOutline } from 'react-icons/ti/index.js'
import {handleToggleTweet} from '../actions/tweets'
import {Link, withRouter} from 'react-router-dom'
const mapStateToProps = ({authedUsers, tweets, users}, {id}) => {
    const tweet = tweets[id];
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null

    return {
        authedUsers,
        tweet: tweet 
                ? formatTweet(tweet, users[tweet.author], authedUsers, parentTweet)
                : null
    }
}

class Tweet extends Component {
    toParent = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/tweet/${id}`)
    }

    handleLike = (e) => {
        e.preventDefault()

        const { dispatch, tweet, authedUsers } = this.props
        dispatch(handleToggleTweet({
            id: tweet.id,
            hasLiked: tweet.hasLiked,
            authedUsers
        }))
    }

    render () {
        const { tweet } = this.props
        if (tweet === null) {
            return (
                <p>This tweet is null</p>
            )
        }
        console.log('this is tweet => ', tweet)
        const { name, avatar, timestamp, text, hasLiked, likes,id, replies, parent } = tweet


        return (
            <Link to={`/tweet/${id}`} className='tweet'>
                <img 
                src={avatar}
                alt={`Avatar of ${name}`}
                className='avatar'
                />
                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>    
                    </div>
                    <div className='tweet-icons'>
                        <TiArrowBackOutline className='tweet-icon'/>
                        <span>{replies !== 0 && replies}</span>
                        <button className='heart-button' onClick={this.handleLike}>
                            {hasLiked === true
                            ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                            : <TiHeartOutline className='tweet-icon' />}
                        </button>
                        <span>
                            {likes !== 0 && likes}
                        </span>
                    </div>
                </div>
            </Link>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Tweet))