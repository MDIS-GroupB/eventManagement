import React from 'react'
import Like from 'material-ui/svg-icons/action/thumb-up';
import Dislike from 'material-ui/svg-icons/action/thumb-down';
import IconButton from '@material-ui/core/IconButton';
import { likeEvent } from '../../api/event'
import { disLikeEvent } from '../../api/event'

export default class myThing extends React.Component {
    state = {
        like: 0,
        disLike: 0
    }

    componentDidMount() {
        this.setState({ like: this.props.likeCount })
        this.setState({ disLike: this.props.disLikeCount })
    }

    onHandleLike = async () => {
        console.log("you like this" + this.props.passedId)
        let likeCount = await likeEvent(this.props.passedId)
        console.log("likeCount is " + likeCount)
        this.setState({ like: likeCount })
    }

    onHandleDislike = async () => {
        console.log("you don't like this " + this.props.passedId)
        let disLikeCount = await disLikeEvent(this.props.passedId)
        console.log("disLikeCount is " + disLikeCount)
        this.setState({ disLike: disLikeCount })
    }

    render() {
        return (
            <>
                <IconButton>
                    <Like onClick={this.onHandleLike} />
                </IconButton>
                <i><b>{this.state.like}</b></i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <IconButton>
                    <Dislike onClick={this.onHandleDislike} />
                </IconButton>
                <i><b>{this.state.disLike}</b></i>
            </>
        )
    }
}