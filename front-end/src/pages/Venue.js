import React, { Component } from 'react'
// import { getEventData } from "./../api/admin"

import { getVenue } from '../api/venue'
import CircularProgress from 'material-ui/CircularProgress';
import CommentBox from '../components/molecules/commentBox'

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
      <commentBox />
      <h1><i>Venue Page</i></h1>
      {!!this.state.venueData ? (
        <>
          <h2 style={{ color: 'red' }}>Venue Details:</h2>
          <h2><i>{this.state.venueData.name}</i></h2>
          <h3><i>{this.state.venueData.description}</i></h3>
          <h3><i>{this.state.venueData.location}</i></h3>
          <img src={this.state.venueData.image}></img>
          {this.state.venueData.theme.map(theme => <h3><i>{theme}</i></h3>)}
          <CommentBox passedId={this.props.match.params.venueId} />
        </>
      )

        : (<CircularProgress />)}

    </>
  }
}