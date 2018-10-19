import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import TextField from '../atoms/TextField'
import { createEvent, getVenues } from "../../api/event"
import { CircularProgress } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import VenueTable from '../atoms/VenueTable';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

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
    open: true,
    name: "",
    searchText: "",
    theme: "",
    noOfTickets: "",
    price: "",
    description: "",
    selectedVenue: { _id: 'none' },
    venues: null,
    displayedVenues: null,
  }
  onInputChange = (e, newValue) => {
    console.log(e.target.id)
    console.log(newValue)
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

  createEvent = () => {
    let a = {
      name: this.state.name,
      theme: this.state.theme,
      noOfTickets: this.state.noOfTickets,
      price: this.state.price,
      description: this.state.description,
    }
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
            <TextField
              onChange={this.onInputChange}
              onEnterKeyDown={this.createEvent}
              value={this.state.name}
              label='name'
              id='name'
              hintText='name'
              floatingLabelText='name'
            />
            <br />
            <TextField
              onChange={this.onInputChange}
              onEnterKeyDown={this.createEvent}
              value={this.state.theme}
              label='theme'
              id='theme'
              hintText='theme'
              floatingLabelText='theme'
            />
            <br />
            <TextField
              onChange={this.onInputChange}
              onEnterKeyDown={this.createEvent}
              value={this.state.noOfTickets}
              label='noOfTickets'
              id='noOfTickets'
              hintText='noOfTickets'
              floatingLabelText='noOfTickets'
            />
            <br />
            <TextField
              onChange={this.onInputChange}
              onEnterKeyDown={this.createEvent}
              value={this.state.price}
              label='price'
              id='price'
              hintText='price'
              floatingLabelText='price'
            />
            <br />
            <TextField
              onChange={this.onInputChange}
              onEnterKeyDown={this.createEvent}
              value={this.state.description}
              label='description'
              id='description'
              hintText='description'
              floatingLabelText='description'
              multiline='true'
              row='5'
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
            <RaisedButton onClick={this.handleClose} color="primary" autoFocus>
              Create Event
            </RaisedButton>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
