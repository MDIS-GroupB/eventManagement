import React, { Component } from 'react'
// import { getEventData } from "./../api/admin"

import { getVenue } from '../api/venue'
import CircularProgress from 'material-ui/CircularProgress';
import ViewEventTabs from '../components/molecules/AdminViewEventTabs';

export default class LoginPage extends Component {

  state = {
    venueData: null
  };

  constructor(props) {
    super()
  }

  async componentDidMount() {
    console.log("id is" + this.props.match.params.venueId)
    console.log(getVenue(this.props.match.params.venueId))
    console.log("you got this" + this.state.venueData)

    let response = await getVenue(this.props.match.params.venueId)
    this.setState({ venueData: response })
    console.log(this.state.venueData)
  }



  render() {
    return <>

      <h1>Venue Page</h1>
      {!!this.state.venueData ? (
        <>
          <p>Our Data:</p>
          <h2>{this.state.venueData.name}</h2>
          <h3>{this.state.venueData.description}</h3>
          <h3>{this.state.venueData.location}</h3>
          <img src={this.state.venueData.image}></img>
          {this.state.venueData.theme.map(theme => <h4>{theme}</h4>)}
        </>

      )

        : (<CircularProgress />)}

    </>
  }
}