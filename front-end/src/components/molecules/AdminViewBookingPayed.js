import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import BookingCheckTable from '../atoms/adminBookingCheckTable'
import { CircularProgress } from '@material-ui/core';
import { getBookingData } from "../../api/admin"

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function sortPayment(events) {
  let returnJson = {
    pending: [],
    paid: [],
  }
  events.map((booking) => {
    console.log(booking)
    if (booking.payedOut) {
      console.log(true)
      returnJson.paid.push(booking)
    } else {
      console.log(false)
      returnJson.pending.push(booking)
    }
  })
  return returnJson

}

export default class ViewEventTabs extends React.Component {

  state = {
    tabNo: 0,
    events: null,
  }
  handleChange = (event, value) => {
    this.setState({ tabNo: value });
  };

  getEvents = async () => {
    let events = await getBookingData();
    this.setState({ events: events });
  }

  async componentDidMount() {

    this.getEvents();
  }

  render() {
    let sortedPayment;
    if (this.state.events) {
      sortedPayment = sortPayment(this.state.events)
    }

    return (
      <div>
        {this.state.events ? (
          <div>
            <AppBar style={{ width: '80%', alignSelf: 'center' }} position="static">
              <Tabs value={this.state.tabNo} onChange={this.handleChange}>
                <Tab label="Paid" />
                <Tab label="Pending" />
              </Tabs>
            </AppBar>
            {this.state.tabNo === 0 &&
              <BookingCheckTable getEvents={this.getEvents.bind(this)} events={sortedPayment.paid} />
            }
            {this.state.tabNo === 1 &&
              <BookingCheckTable payedOut={false} getEvents={this.getEvents.bind(this)} events={sortedPayment.pending} />
            }
          </div>
        ) : (
            <CircularProgress />
          )}
      </div>
    )
  }
}
