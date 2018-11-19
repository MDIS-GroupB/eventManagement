import React, { Component } from 'react'
// import { getEventData } from "./../api/admin"

import { getEvent } from '../api/event'
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { createComment } from "../api/comment"
import { getComments } from '../api/comment'
import { TableBody } from '@material-ui/core';
import { withRouter } from 'react-router-dom';


class LoginPage extends Component {

    state = {
        eventData: null,
        comments: "",
        prevComments: null,
        reloadPage: 0
    };

    constructor(props) {
        super()
    }

    async componentDidMount() {
        console.log("id is" + this.props.match.params.eventId)
        console.log(getEvent(this.props.match.params.eventId))
        console.log("this.props")
        console.log(this.props)
        let response = await getEvent(this.props.match.params.eventId)
        this.setState({ eventData: response })

        let prevComments = await getComments(this.props.match.params.eventId)
        console.log("prevComments")
        console.log(prevComments)
        this.setState({ prevComments: prevComments })

        console.log("this is the state")
        console.log(this.state)
        this.onCommentChange = this.onCommentChange.bind(this)
        this.onHandleComment = this.onHandleComment.bind(this)
    }

    async componentWillMount() {

    }

    onCommentChange = (event) => {
        this.setState({
            comments: event.target.value
        })
    }

    onHandleComment = () => {
        var commentDate = new Date()
        let a = {
            eventId: this.props.match.params.eventId,
            comments: this.state.comments,
            commentDate: commentDate.toString().slice(0, 23),
        }
        console.log('==================')
        console.log(a)
        console.log('==================')
        createComment(a);
        this.mainInput.value = "";
        this.componentDidMount();
    }

    //need : 1.date and time 2.need current user 3.need event id 4.need comment

    render() {
        const prevComments = this.state.prevComments;
        return <>

            <h1><i>Event Page</i></h1>
            {(!!this.state.eventData && this.state.prevComments) ? (
                <>
                    <h2 style={{ color: 'red' }}>Event Details:</h2>
                    <h3><i>{this.state.eventData.eventData.name}</i></h3>
                    <h3><i>{this.state.eventData.eventData.description}</i></h3>
                    <h3><i>{this.state.eventData.eventData.dateAndTime}</i></h3>
                    <h3><i>{this.state.eventData.eventData.price} SGD</i></h3>

                    <h2 style={{ color: 'red' }}>Event Proposer:</h2>
                    <h3><i>{this.state.eventData.properser.firstName} {this.state.eventData.properser.lastName}</i></h3>

                    <h2 style={{ color: 'red' }}>Event Venue Details:</h2>
                    <h3><i>{this.state.eventData.eventData.venueId.name}</i></h3>
                    <h3><i>{this.state.eventData.eventData.venueId.description}</i></h3>
                    <h3><i>{this.state.eventData.eventData.venueId.location}</i></h3>
                    <img src={this.state.eventData.eventData.venueId.image}></img>
                    {this.state.eventData.eventData.venueId.theme.map(theme => <h3><i>{theme}</i></h3>)}

                    <h2 style={{ color: 'red' }}>Comment Section:</h2>

                    {
                        prevComments.map(comment => {
                            return (
                                <>
                                    <h4><i>{comment.reviewer} {comment.commentDate}</i></h4>
                                    <h5>{comment.comments}</h5>
                                </>
                            )
                        })
                    }

                    {/* <h3>{prevComments[0].comments}</h3> */}
                    {/* <h5><i>{this.state.prevComments}</i></h5> */}
                    <form>
                        {/* <input style={{ width: "500px", height: "200px" }}
                            placeholder="Comment on this Event"
                            multiline={true}
                            rows={50}
                            rowsMax={500}
                            // style={{ width: 500, background: '#32F1FE' }}
                            onChange={this.onCommentChange}
                            value={this.state.comments}
                        /> */}
                        <textarea
                            placeholder="Comment on this Event"
                            onChange={this.onCommentChange}
                            cols="80" rows="10"
                        >
                        </textarea>
                        <br /><br />
                        <RaisedButton onClick={this.onHandleComment} type="submit" color="primary" autoFocus style={{ margin: "auto" }}>
                            Comment
                    </RaisedButton>
                    </form><br /><br />
                </>

            )
                : (<CircularProgress />)}

        </>
    }
}

export default withRouter(LoginPage);