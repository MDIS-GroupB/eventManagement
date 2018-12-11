import React, { Component } from 'react'
import { getEvent } from '../api/event'
import CircularProgress from 'material-ui/CircularProgress';
import { withRouter } from 'react-router-dom';
import CommentBox from '../components/molecules/commentBox'
import LikeButtons from '../components/molecules/likeButtons'

class LoginPage extends Component {

    state = {
        eventData: null,
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
    }

    async componentWillMount() {

    }

    render() {
        return <>
            <h1><i>Event Page</i></h1>
            {(!!this.state.eventData) ? (
                <>
                    <h2 style={{ color: 'red' }}>Event Details:</h2>
                    <h3><i>{this.state.eventData.eventData.name}</i></h3>
                    <h3><i>{this.state.eventData.eventData.description}</i></h3>
                    <h3><i>{this.state.eventData.eventData.dateAndTime}</i></h3>
                    <h3><i>{parseInt(this.state.eventData.eventData.price) / 100} SGD</i></h3>

                    <h2 style={{ color: 'red' }}>Event Proposer:</h2>
                    <h3><i>{this.state.eventData.properser.firstName} {this.state.eventData.properser.lastName}</i></h3>

                    <h2 style={{ color: 'red' }}>Event Venue Details:</h2>
                    <h3><i>{this.state.eventData.eventData.venueId.name}</i></h3>
                    <h3><i>{this.state.eventData.eventData.venueId.description}</i></h3>
                    <h3><i>{this.state.eventData.eventData.venueId.location}</i></h3>
                    <img src={this.state.eventData.eventData.venueId.image}></img>
                    <br />

                    <LikeButtons
                        passedId={this.props.match.params.eventId}
                    />

                    {this.state.eventData.eventData.venueId.theme.map(theme => <h3><i>{theme}</i></h3>)}

                    <CommentBox
                        passedId={this.props.match.params.eventId}
                    />
                </>
            )
                : (<CircularProgress />)}

        </>
    }
}

export default withRouter(LoginPage);