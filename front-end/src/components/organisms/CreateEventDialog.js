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
    description: "Fun Times",
    selectedVenue: { _id: 'none' },
    venues: null,
    displayedVenues: null,
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
    let a = {
      name: this.state.name,
      theme: this.state.theme,
      noOfTickets: this.state.noOfTickets,
      price: this.state.price,
      description: this.state.description,
      venueId:this.state.selectedVenue._id,
    }
    console.log('==================')
    console.log(a)
    console.log('==================')
    createEvent(a);
    // this.setState({ open: false })
  }

  async componentDidMount() {

    let venues = await getVenues()

    this.setState({ venues });
  }

  onVenueSelect(selectedVenue) {
    this.setState({ selectedVenue });
  }


  render() {
    const createEventTextFields = {
      onInputChange: this.onInputChange,
      onEnterKeyDown: this.createEvent,
      fields: eventFields
    }

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
            <br />
            <CreateEventFields
              createEventTextFields={createEventTextFields}
              state={this.state}
            />

            {this.state.venues ? (
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

            ) : <div>
                <CircularProgress />
              </div>
            }
          </div>

          <DialogActions>
            <RaisedButton onClick={this.handleClose} color="primary">
              Cancel
            </RaisedButton>
            <RaisedButton onClick={this.onHandleCreateEvent} color="primary" autoFocus>
              Create Event
            </RaisedButton>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
