import React, { Component } from 'react'
// import { getEventData } from "./../api/admin"

import { getEvent } from '../api/event'
import CircularProgress from 'material-ui/CircularProgress';
import ViewEventTabs from '../components/molecules/AdminViewEventTabs';

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

            <h1>Event Page Dude!</h1>
            {!!this.state.eventData ? (
                <>
                    <p>Our Event Data:</p>
                    <h5>{this.state.eventData.eventData.description}</h5>
                    <h3>{this.state.eventData.eventData.name}</h3>
                    <p>This Event Proposer:</p>
                    <h2>{this.state.eventData.properser.firstName} {this.state.eventData.properser.lastName}</h2>


                    <p>This Event Venue Data:</p>
                    <h2>{this.state.eventData.eventData.venueId.name}</h2>
                    <h3>{this.state.eventData.eventData.venueId.description}</h3>
                    <h3>{this.state.eventData.eventData.venueId.location}</h3>
                    <img src={this.state.eventData.eventData.venueId.image}></img>
                    {this.state.eventData.eventData.venueId.theme.map(theme => <h4>{theme}</h4>)}



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