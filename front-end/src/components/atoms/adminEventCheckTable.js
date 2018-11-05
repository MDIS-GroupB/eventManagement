import React from 'react';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { changeEventStatus } from '../../api/event';
import { Link } from 'react-router-dom'


class ScrollDialog extends React.Component {
  state = {
    open: false,
    scroll: 'paper',
  };

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeEvent = async (id, status) => {

    await changeEventStatus(id, status)
    this.props.getEvents();
  };

  test = async (testParameters) => {
    console.log("=============")
    console.log(testParameters)
  };

  render() {
    return (
      <div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell numeric>Name</TableCell>
                <TableCell numeric>Location</TableCell>
                <TableCell numeric>Description</TableCell>
                <TableCell numeric>Accept</TableCell>
                <TableCell numeric>Decline</TableCell>
                <TableCell numeric>View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.events.map(event => {
                return (
                  <TableRow key={event._id}>
                    <TableCell component="th" scope="row">
                      {event.name}
                    </TableCell>
                    <TableCell numeric>{event.venueId.location}</TableCell>
                    <TableCell numeric>{event.description}</TableCell>
                    <TableCell numeric><Button onClick={() => this.handleChangeEvent(event._id, true)}>Accepte</Button></TableCell>
                    <TableCell numeric><Button onClick={() => this.handleChangeEvent(event._id, false)}>Decline</Button></TableCell>
                    <TableCell numeric > <Link to={`/event/${event._id}`}>View Me</Link></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default ScrollDialog;