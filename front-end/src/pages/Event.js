import React, { Component } from 'react'
// import { getEventData } from "./../api/admin"

import { getEvent } from '../api/event'
import CircularProgress from 'material-ui/CircularProgress';

export default class LoginPage extends Component {

    state = {
        eventData: null
    };

    constructor(props) {
        super()
    }

    async componentDidMount() {
        console.log("id is" + this.props.match.params.eventId)
        console.log(getEvent(this.props.match.params.eventId))

        let response = await getEvent(this.props.match.params.eventId)
        this.setState({ eventData: response })
        console.log(this.state.eventData)
        console.log(this.state.eventData.eventData.description)
    }

    render() {
        return <>

            <h1><i>Event Page</i></h1>
            {!!this.state.eventData ? (
                <>
                    <h2 style={{ color: 'red' }}>Event Details:</h2>
                    <h3><i>{this.state.eventData.eventData.name}</i></h3>
                    <h3><i>{this.state.eventData.eventData.description}</i></h3>
                    <h3><i>{this.state.eventData.eventData.dateAndTime}</i></h3>
                    <h2 style={{ color: 'red' }}>Event Proposer:</h2>
                    <h3><i>{this.state.eventData.properser.firstName} {this.state.eventData.properser.lastName}</i></h3>


                    <h2 style={{ color: 'red' }}>Event Venue Details:</h2>
                    <h3><i>{this.state.eventData.eventData.venueId.name}</i></h3>
                    <h3><i>{this.state.eventData.eventData.venueId.description}</i></h3>
                    <h3><i>{this.state.eventData.eventData.venueId.location}</i></h3>
                    <img src={this.state.eventData.eventData.venueId.image}></img>
                    {this.state.eventData.eventData.venueId.theme.map(theme => <h3><i>{theme}</i></h3>)}



                    {/* <p>Our Data:</p>
                    <h2>{this.state.eventData.description}</h2>
                    <h3>{this.state.eventData.name}</h3>
                    <h3>{this.state.eventData.description}</h3>
                    <img src={this.state.eventData.image}></img>
                    {this.state.eventData.theme.map(theme => <h4>{theme}</h4>)}
                    <h4>{this.state.eventData.venueId}</h4> */}
                </>

            )

                : (<CircularProgress />)}

        </>
    }
}