import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import TextField from './TextField'
import { createEvent, getVenues } from "./../../api/event"
import { CircularProgress } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog, { DialogActions } from "material-ui/Dialog";

function sortVenues(venues) {
  let returnVenues = []
  for (let i = 0; i < 10; i++) {
    returnVenues.push(venues[i])
  }
  return returnVenues

}

export default class SelectDevices extends React.Component {

  state = {
    open: false,
    name: "",
    theme: "",
    noOfTickets: "",
    price: "",
    description: "",
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

    this.setState({ venues: venues });
  }


  render() {

    return (
      <div>
        <RaisedButton onClick={this.handleClickOpen}>Create Event</RaisedButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll="body"
          autoScrollBodyContent={true}
        >
          <div style={{ overflowY: 'scroll', height: '1400px' }}>
            <TextField
              onChange={this.onInputChange}
              // onEnterKeyDown={this.createEvent}
              value={this.state.name}
              label='name'
              id='name'
              hintText='name'
              floatingLabelText='name'
            />
            <TextField
              onChange={this.onInputChange}
              // onEnterKeyDown={this.createEvent}
              value={this.state.theme}
              label='theme'
              id='theme'
              hintText='theme'
              floatingLabelText='theme'
            />
            <TextField
              onChange={this.onInputChange}
              // onEnterKeyDown={this.createEvent}
              value={this.state.noOfTickets}
              label='noOfTickets'
              id='noOfTickets'
              hintText='noOfTickets'
              floatingLabelText='noOfTickets'
            />
            <TextField
              onChange={this.onInputChange}
              // onEnterKeyDown={this.createEvent}
              value={this.state.price}
              label='price'
              id='price'
              hintText='price'
              floatingLabelText='price'
            />
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
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Location</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortVenues(this.state.venues).map(venue => {
                      return (
                        <TableRow key={Math.random()}>
                          <TableCell component="th" scope="row">
                            {venue.name}
                          </TableCell>
                          <TableCell numeric>{venue.location}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

              </Paper>
            ) : <CircularProgress />}

          </div>
          {/* <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions> */}
        </Dialog>
      </div>
    )
  }
}
