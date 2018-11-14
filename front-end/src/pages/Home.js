import React, { Component } from 'react'
import { getUserDetails } from "./../api/user"
import CircularProgress from 'material-ui/CircularProgress';
import CreateEventDialog from '../components/organisms/CreateEventDialog';
import ViewEventTabs from '../components/molecules/ViewEventTabs';
// import CreateEventDialog from '../components/atoms/Test';
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

export default class LoginPage extends Component {

  state = {
    details: null,
    redirect: ''
  };

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

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
    this.setState({ redirect: this.props.venues._id })
  };

  render() {
    return (
      <div>
        {this.state.details ? (
          <div>
            <i><h1>Haiiiiii {this.state.details.firstName}</h1></i>
            <CreateEventDialog />
            <br />
            <ViewEventTabs />
          </div>
        ) : (
            <CircularProgress />
          )}
      </div>
    )
  }
}
