import React, { Component } from 'react'
import { getUserDetails } from "./../api/user"
import CircularProgress from 'material-ui/CircularProgress';
import CreateEventDialog from '../components/organisms/CreateEventDialog';
import ViewEventTabs from '../components/atoms/ViewEventTabs';
// import CreateEventDialog from '../components/atoms/Test';

export default class LoginPage extends Component {

  state = { details: null };

  constructor(props) {
    super()
  }

  async componentDidMount() {
    let details = await getUserDetails()
    if (details) {
      this.setState({
        details: details[0]
      })
    }
  }

  render() {
    return (
      <div>
        {this.state.details ? (
          <div>
            <h1>Haiiiiii {this.state.details.firstName}</h1>
            <CreateEventDialog />
            <ViewEventTabs />
          </div>
        ) : (
            <CircularProgress />
          )}
      </div>
    )
  }
}
