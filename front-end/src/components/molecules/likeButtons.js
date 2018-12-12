import React from 'react'
import Like from 'material-ui/svg-icons/action/thumb-up';
import Dislike from 'material-ui/svg-icons/action/thumb-down';
import IconButton from '@material-ui/core/IconButton';
import { doLike } from '../../api/like'
import { donLike } from '../../api/like'
import { getLikeCount } from '../../api/like'


export default class myThing extends React.Component {
    state = {
        likeData: null
    }

    async componentDidMount() {
        let likeData = await getLikeCount(this.props.passedId)
        console.log("likeData")
        console.log(likeData)
        this.setState({
            like: likeData.likeCount,
            disLike: likeData.disLikeCount
        })
    }

    onHandleLike = async () => {
        // console.log("you like this")
        // let likeCount = await doLike(this.props.passedId)
        // this.setState({
        //     like: likeCount,
        // })
        // console.log(this.state.like + " ~ " + this.state.disLike)
    }

    onHandleDislike = async () => {
        // console.log("you don like this")
        // let disLikeCount = await donLike(this.props.passedId)
        // this.setState({
        //     disLike: disLikeCount
        // })
        // console.log(this.state.like + " ~  " + this.state.disLike)
    }

    render() {
        return (
            <>
                <IconButton
                // disabled={true}
                >
                    <Like style={{ color: "blue" }}
                        onClick={this.onHandleLike} />
                </IconButton>
                <i><b>{this.state.like}</b></i>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <IconButton
                // disabled={true}
                >
                    <Dislike style={{ color: 'red' }}
                        onClick={this.onHandleDislike} />
                </IconButton>
                <i><b>{this.state.disLike}</b></i>
            </>
        )
    }
}