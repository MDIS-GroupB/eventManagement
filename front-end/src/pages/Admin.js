import React, { Component } from 'react'
// import { getEventData } from "./../api/admin"
import CircularProgress from 'material-ui/CircularProgress';
import ViewEventTabs from '../components/molecules/AdminViewEventTabs';

export default class LoginPage extends Component {

  state = { details: null };

  constructor(props) {
    super()
  }

  async componentDidMount() {
  }

  render() {
    return <><h1>Admin Page</h1>
      <ViewEventTabs />

    </>
  }
}
