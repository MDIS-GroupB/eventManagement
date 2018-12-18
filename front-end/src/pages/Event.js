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
            <h1>Event Page</h1>
            {(!!this.state.eventData) ? (
                <div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center', flexDirection: 'column', justifyContent: 'space-around' }}>
                            <div style={{ textAlign: 'center', border: '2px solid black', margin: '20px' }}>
                                <h3>Event Details:</h3>
                                <h4>{this.state.eventData.eventData.name}</h4>
                                <h4>{this.state.eventData.eventData.description}</h4>
                                <h4>{this.state.eventData.eventData.dateAndTime}</h4>
                                <h4>{parseInt(this.state.eventData.eventData.price) / 100} SGD</h4>
                            </div>

                            <div style={{ border: '2px solid black', margin: '20px' }}>
                                <h3>Event Proposer:</h3>
                                <h4>{this.state.eventData.properser.firstName} {this.state.eventData.properser.lastName}</h4>
                            </div>

                            <div style={{ border: '2px solid black', margin: '20px' }}>
                                <h3>Event Venue Details:</h3>
                                <h4>{this.state.eventData.eventData.venueId.name}</h4>
                                <h4>{this.state.eventData.eventData.venueId.description}</h4>
                                <h4>{this.state.eventData.eventData.venueId.location}</h4>
                                <img src={this.state.eventData.eventData.venueId.image}></img>
                                <br />
                            </div>
                        </div>

                        <div>
                            <h3>Venue Type</h3>
                            <LikeButtons
                                passedId={this.props.match.params.eventId}
                            />
                        </div>

                        <h4>{this.state.eventData.eventData.venueId.theme.join(', ')}</h4>

                        <CommentBox
                            passedId={this.props.match.params.eventId}
                        />
                    </div>
                </div>
            )
                : (<CircularProgress />)}

        </>
    }
}

export default withRouter(LoginPage);