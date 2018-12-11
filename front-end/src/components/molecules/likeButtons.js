import React from 'react'
import Like from 'material-ui/svg-icons/action/thumb-up';
import Dislike from 'material-ui/svg-icons/action/thumb-down';
import IconButton from '@material-ui/core/IconButton';
import { doLike } from '../../api/like'
import { donLike } from '../../api/like'
import { doNeutral } from '../../api/like'


export default class myThing extends React.Component {
    state = {
        like: null,
        disLike: null,
        neutral: null,
    }

    componentDidMount() {
        //retrieve and setState
    }

    onHandleLike = async (id) => {
        if (this.state.neutral) {
            this.setState({
                neutral: false,
                like: true
            })
            doLike(id)
        }
        else if (this.state.like) {
            this.setState({
                like: false,
                neutral: true
            })
            doNeutral(id)
        }
        else {
            this.setState({
                dislike: false,
                like: true
            })
            doLike(id)
        }
    }

    onHandleDislike = async (id) => {
        if (this.state.neutral) {
            this.setState({
                neutral: false,
                disLike: true
            })
            donLike(id)
        }
        else if (this.state.like) {
            this.setState({
                like: false,
                disLike: true
            })
            donLike(id)
        }
        else {
            this.setState({
                dislike: false,
                neutral: true
            })
            doNeutral(id)
        }
    }

    render() {
        return (
            <>
                <IconButton>
                    <Like onClick={this.onHandleLike(this.props.passedId)} />
                </IconButton>
                <i><b>{this.state.like}</b></i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <IconButton>
                    <Dislike onClick={this.onHandleDislike(this.props.passedId)} />
                </IconButton>
                <i><b>{this.state.disLike}</b></i>
            </>
        )
    }
}