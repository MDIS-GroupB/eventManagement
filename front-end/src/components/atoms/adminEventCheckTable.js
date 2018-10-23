import React from 'react';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
              {this.props.venues.map(venue => {
                return (
                  <TableRow key={venue._id}>
                    <TableCell component="th" scope="row">
                      {venue.name}
                    </TableCell>
                    <TableCell numeric>{venue.venueId.location}</TableCell>
                    <TableCell numeric>{venue.description}</TableCell>
                    <TableCell numeric><Button>Accepte</Button></TableCell>
                    <TableCell numeric><Button>Decline</Button></TableCell>
                    <TableCell numeric><Button>View Me</Button></TableCell>
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