import React from 'react'
import Like from 'material-ui/svg-icons/action/thumb-up';
import Dislike from 'material-ui/svg-icons/action/thumb-down';
import IconButton from '@material-ui/core/IconButton';
import { likeEvent } from '../../api/event'
import { disLikeEvent } from '../../api/event'

export default class myThing extends React.Component {
    onHandleLike = async () => {
        console.log("you like this" + this.props.passedId)
        await likeEvent(this.props.passedId)
    }

    onHandleDislike = async () => {
        console.log("you don't like this " + this.props.passedId)
        await disLikeEvent(this.props.passedId)
    }

    render() {
        return (
            <>
                <IconButton>
                    <Like onClick={this.onHandleLike} />
                </IconButton>
                <i><b>{this.props.likeCount}</b></i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <IconButton>
                    <Dislike onClick={this.onHandleDislike} />
                </IconButton>
                <i><b>{this.props.disLikeCount}</b></i>
            </>
        )
    }
}