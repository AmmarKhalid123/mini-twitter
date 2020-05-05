import { getInitialData } from '../utils/api';
import { recieveUsers} from './users';
import { recieveTweets} from './tweets';
import {setAuthedUser} from './authedUser';

const AUTHED_ID = 'tylermcginnis';

export function handleInitialData () {
    return (dispatch) => {
        return getInitialData()
                .then(({users, tweets}) => {
                    dispatch(recieveUsers(users))
                    dispatch(recieveTweets(tweets))
                    dispatch(setAuthedUser(AUTHED_ID))
                })
    }
}