import React from 'react';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Link } from 'react-router-dom'



class ScrollDialog extends React.Component {
  state = {
    open: false,
    scroll: 'paper',
    redirect: '',
  };

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
    this.setState({ redirect: this.props.venues._id })
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // onHandleViewMe = (para) => {
  //   let Path = '/venue/:' + para;
  //   this.props.history.push(Path);
  //   console.log("hey where is my props" + this.props.venues)
  // };

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
                <TableCell numeric>Select</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.venues.map(venue => {
                return (
                  <TableRow key={venue._id}>
                    <TableCell component="th" scope="row">
                      {venue.name}
                    </TableCell>
                    {/* <TableCell numeric>{venue._id}</TableCell> */}
                    <TableCell numeric>{venue.location}</TableCell>
                    <TableCell numeric>{venue.description}</TableCell>
                    <TableCell numeric><Link to={`/event/${venue._id}`}>View Me</Link></TableCell>
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