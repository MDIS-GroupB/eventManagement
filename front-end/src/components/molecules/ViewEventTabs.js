import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import EventCheckTable from '../atoms/eventCheckTable'
import { CircularProgress } from '@material-ui/core';
import { getPersonalEvents } from "../../api/personalEvent"

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function sortEvents(events) {
  let returnJson = {
    pending: [],
    rejected: [],
    accepted: [],
  }
  let returnEvents = events.map((event) => {
    console.log('event.status')
    console.log(event.status)
    if (!event.status) {
      returnJson.pending.push(event)
    } else if (event.status.approved) {
      returnJson.accepted.push(event)
    } else if (!event.status.approved) {
      returnJson.rejected.push(event)
    }
  })
  return returnJson

}

export default class ViewEventTabs extends React.Component {

  state = {
    tabNo: 2,
    events: null,
  }
  handleChange = (event, value) => {
    this.setState({ tabNo: value });
  };

  async componentDidMount() {

    let personalEvents = await getPersonalEvents()

    this.setState({ events: personalEvents });
  }

  render() {
    let sortedEvents
    if (this.state.events) {
      sortedEvents = sortEvents(this.state.events)
    }

    return (
      <div>
        {this.state.events ? (
          <div>
            {/* <AppBar style={{ width: '80%', alignSelf: 'center' }} position="static">
              <Tabs value={this.state.tabNo} onChange={this.handleChange}>
                <Tab label="Pending" />
                <Tab label="Rejected" />
                <Tab label="Accepted" />
              </Tabs>
            </AppBar> */}
            {/* {this.state.tabNo === 0 &&
              <EventCheckTable events={sortedEvents.pending} />
            }
            {this.state.tabNo === 1 &&
              <EventCheckTable events={sortedEvents.rejected} />
            } */}
            {this.state.tabNo === 2 &&
              <EventCheckTable events={sortedEvents.accepted} />
            }
          </div>
        ) : (
            <CircularProgress />
          )}
      </div>
    )
  }
}
