import React from 'react'
import Like from 'material-ui/svg-icons/action/thumb-up';
import Dislike from 'material-ui/svg-icons/action/thumb-down';
import IconButton from '@material-ui/core/IconButton';
import { doLike } from '../../api/like'
import { donLike } from '../../api/like'
import { getLikeCount } from '../../api/like'
import CircularProgress from '@material-ui/core/CircularProgress';


export default class myThing extends React.Component {
    state = {
        likeData: null
    }

    async componentDidMount() {
        let likeData = await getLikeCount(this.props.passedId)
        console.log("likeData")
        console.log(likeData)
        this.setState({
            likeData: likeData
        })
    }

    onHandleLike = async () => {
        console.log("you like this")
        this.setState({
            likeData: null,
        })
        await doLike(this.props.passedId)
        let likeData = await getLikeCount(this.props.passedId)
        this.setState({
            likeData: likeData,
        })
    }

    onHandleDislike = async () => {
        await this.setState({
            likeData: null,
        })
        await donLike(this.props.passedId)
        let likeData = await getLikeCount(this.props.passedId)
        await this.setState({
            likeData: likeData,
        })
    }

    render() {
        return (
            <>
                {
                    this.state.likeData ? (
                        <>
                            {this.state.likeData.myLike ? (
                                <>
                                    <IconButton
                                    // disabled={true}
                                    >
                                        <Like style={this.state.likeData.myLike.like ? { color: "blue" } : {}}
                                            onClick={this.onHandleLike} />
                                    </IconButton>
                                    <i><b>{this.state.likeData.likeCount}</b></i>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <IconButton
                                    // disabled={true}
                                    >
                                        <Dislike style={!this.state.likeData.myLike.like ? { color: "red" } : {}}
                                            onClick={this.onHandleDislike} />
                                    </IconButton>
                                    <i><b>{this.state.likeData.disLikeCount}</b></i>
                                </>
                            ) : (
                                    <>
                                        <IconButton
                                        // disabled={true}
                                        >
                                            <Like
                                                onClick={this.onHandleLike} />
                                        </IconButton>
                                        <i><b>{this.state.likeData.likeCount}</b></i>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <IconButton
                                        // disabled={true}
                                        >
                                            <Dislike
                                                onClick={this.onHandleDislike} />
                                        </IconButton>
                                        <i><b>{this.state.likeData.disLikeCount}</b></i>
                                    </>
                                )}
                        </>
                    ) : (
                            <CircularProgress />
                        )
                }
            </>
        )
    }
}