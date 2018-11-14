import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import TextField from '../atoms/TextField'
import { getVenues } from "../../api/venue"
import { createEvent } from "../../api/personalEvent"
import { CircularProgress } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import VenueTable from '../atoms/VenueTable';
import CreateEventFields from '../molecules/CreateEventFields';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const eventFields = [{
  id: 'name',
  label: 'Name',
},
{
  id: 'noOfTickets',
  label: 'Number Of Tickets',
},
{
  id: 'description',
  label: 'Description',
},
{
  id: 'price',
  label: 'Price',
}]

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function filterVenues(venues, searchText) {
  let returnVenues = [];
  let reg = new RegExp(`${searchText}`, 'i');
  venues.forEach((searchVenue, i) => {
    if (searchVenue.name.match(reg)) {
      returnVenues.push(searchVenue)
    }
  })
  return returnVenues
}

export default class CreateEventDialog extends React.Component {

  state = {
    open: false,
    name: "Crazy Event",
    searchText: "",
    theme: "",
    noOfTickets: "12",
    price: "200",
    selectedDateAndTime: "2017-05-24T10:30",
    description: "Fun Times",
    selectedVenue: { _id: 'none' },
    venues: null,
    displayedVenues: null,
    passedProps: null
  }
  onInputChange = (e, newValue) => {
    this.setState({
      [e.target.id]: newValue
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onHandleCreateEvent = () => {
    if (this.state.passedVenueId) {
      var currentVenueId = this.state.passedVenueId
      this.setState({ open: false })
    }
    else {
      var currentVenueId = this.state.selectedVenue._id
    }
    let a = {
      name: this.state.name,
      theme: this.state.theme,
      noOfTickets: this.state.noOfTickets,
      price: this.state.price,
      dateAndTime: this.state.selectedDateAndTime,
      description: this.state.description,
      venueId: currentVenueId,
    }
    console.log('==================')
    console.log(a)
    console.log('==================')
    createEvent(a);
    this.setState({ open: false })
  }

  async componentDidMount() {
    let venues = await getVenues()
    this.setState({ venues });
    let passedVenueId = this.props.selectedVenueId
    this.setState({ passedVenueId });
    this.onDateAndTimeSelect = this.onDateAndTimeSelect.bind(this)
    this.onHandleCreateEvent = this.onHandleCreateEvent.bind(this)
  }

  onVenueSelect(selectedVenue) {
    this.setState({ selectedVenue });
  }

  onDateAndTimeSelect(event) {
    console.log(event.target.value)
    this.setState({ selectedDateAndTime: event.target.value })
  }

  render() {
    const createEventTextFields = {
      onInputChange: this.onInputChange,
      onEnterKeyDown: this.createEvent,
      fields: eventFields,
    }

    const selectedVenue = this.props.selectedVenue

    return (
      <div>
        <RaisedButton onClick={this.handleClickOpen}>Create Event</RaisedButton>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          scroll="paper"
          TransitionComponent={Transition}
        >
          <DialogTitle>Create Event</DialogTitle>
          <div style={{ overflowY: 'scroll' }}>
            <CreateEventFields
              createEventTextFields={createEventTextFields}
              state={this.state}
            />

            <TextField
              id="datetime-local"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              floatingLabelText='Date And Time'
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.onDateAndTimeSelect}
            />
            <br />
            {!!selectedVenue ? (
              <TextField
                floatingLabelText='Selected Venue'
                defaultValue={selectedVenue}
                readOnly
              />) :

              this.state.venues ? (
                <div>
                  <TextField
                    onChange={this.onInputChange}
                    onEnterKeyDown={this.createEvent}
                    value={this.state.searchText}
                    label='Search e.g. The Bar'
                    id='searchText'
                    hintText='Search'
                    floatingLabelText='Search'
                  />
                  {!!this.state.searchText ?
                    (
                      <VenueTable
                        selectedVenue={this.state.selectedVenue}
                        onVenueSelect={(newVenue) => (this.onVenueSelect(newVenue))}
                        venues={filterVenues(this.state.venues, this.state.searchText)}
                      />
                    ) : false
                  }
                </div>
              ) : <div>}
                  <CircularProgress />
                </div>
            }
          </div>
          <DialogActions >
            <RaisedButton onClick={this.handleClose} color="primary" style={{ margin: "auto" }}>
              Cancel
            </RaisedButton>
            <RaisedButton onClick={this.onHandleCreateEvent} color="primary" autoFocus style={{ margin: "auto" }}>
              Create Event
            </RaisedButton>
          </DialogActions>
        </Dialog >
      </div >
    )
  }
}
