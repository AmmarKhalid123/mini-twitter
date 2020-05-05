import React, { Component } from 'react'
import { connect } from 'react-redux'
import {handleAddTweet} from '../actions/tweets'
import { Redirect } from 'react-router-dom'

class NewTweet extends Component {
    state = {
        text : '',
        toHome: false
    }
    handleChange = (e) => {
        const text = e.target.value

        this.setState({
            text: text
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch, id } = this.props

        dispatch(handleAddTweet(this.state.text, id))

        this.setState((current) => ({
            text: '',
            toHome: id ? false : true
        }))

    }
    render () {
        const tweetLeft = 280 - this.state.text.length
        if (this.state.toHome) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <h3 className='center'>Compose New Tweet</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <textarea 
                    placeholder="What's happening"
                    value={this.state.text} 
                    onChange={this.handleChange}
                    className='textarea'
                    maxLength={280}  />
                    {tweetLeft <= 100 && (
                        <div className='tweet-length'> {tweetLeft}</div>
                    )}
                    <button className='btn' type='submit' disabled={this.state.text === ''}>
                        Submit
                    </button>
                </form>

            </div>
        );
    }
}

export default connect()(NewTweet)