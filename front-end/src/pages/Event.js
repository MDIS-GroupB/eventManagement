import React, { Component } from 'react'
// import { getEventData } from "./../api/admin"

import { getEvent } from '../api/event'
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { createComment } from "../api/comment"

export default class LoginPage extends Component {

    state = {
        eventData: null,
        comments: ""
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
        console.log(this.state.eventData)
        console.log(this.state.eventData.eventData.description)
        this.onCommentChange = this.onCommentChange.bind(this)
        this.onHandleComment = this.onHandleComment.bind(this)
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
            commentDate: commentDate,
        }
        console.log('==================')
        console.log(a)
        console.log('==================')
        createComment(a);
        this.setState({ open: false })
    }

    //need : 1.date and time 2.need current user 3.need event id 4.need comment

    render() {
        return <>
            <h1><i>Event Page</i></h1>
            {!!this.state.eventData ? (
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
                    <TextField
                        placeholder="Comment on this Event"
                        multiline={true}
                        rows={10}
                        rowsMax={10}
                        style={{ width: 800, background: '#32F1FE' }}
                        onChange={this.onCommentChange}
                    /><br />
                    <RaisedButton onClick={this.onHandleComment} color="primary" autoFocus style={{ margin: "auto" }}>
                        Comment
                    </RaisedButton>
                </>

            )

                : (<CircularProgress />)}

        </>
    }
}