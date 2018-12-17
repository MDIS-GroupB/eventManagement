import React from 'react';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { changeBookingPaid } from '../../api/event';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
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

  handleChangeEvent = async (id) => {

    await changeBookingPaid(id)
    this.props.getEvents();
  };

  test = async (testParameters) => {
    console.log("=============")
    console.log(testParameters)
  };

  render() {
    return (
      <div>
        {this.props.events.map(order => (
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Typography>{moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                {this.props.payedOut && <div style={{ height: '50px' }}><RaisedButton onClick={() => { this.handleChangeEvent(order._id) }}>PAID</RaisedButton></div>}
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <p>{order.eventId.name}</p>
                <p>{order.eventId.description}</p>
                {/* DEREK PLEASE FINISH */}
                {/* Just add more details that would seem appropriate */}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

export default ScrollDialog;