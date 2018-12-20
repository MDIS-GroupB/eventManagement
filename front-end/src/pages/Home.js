import React, { Component } from 'react'
import { getUserDetails } from "./../api/user"
import CircularProgress from 'material-ui/CircularProgress';
import CreateEventDialog from '../components/organisms/CreateEventDialog';
import ViewEventTabs from '../components/molecules/ViewEventTabs';
// import CreateEventDialog from '../components/atoms/Test';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

export default class LoginPage extends Component {

  state = {
    details: null,
    redirect: ''
  };

  constructor(props) {
    super()
  }

  async componentDidMount() {
    let details = await getUserDetails()
    if (details) {
      this.setState({
        details: details
      })
    }
    console.log(details)
  }

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
    this.setState({ redirect: this.props.venues._id })
  };

  render() {
    return (
      <div>
        {this.state.details ? (
          <div>
            <i><h1>Welcome {this.state.details.firstName}</h1></i>
            <CreateEventDialog />
            <h3>My Approved Events</h3>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}> <div style={{ width: '80%' }}><ViewEventTabs /></div></div>
            <h3>Order History</h3>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {this.state.details.orderHistory.length > 0 ? (
                <div style={{ width: '80%' }}>
                  {this.state.details.orderHistory.map((order) => (
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography style={{ margin: 'auto' }}>
                          {console.log("derek helping " + JSON.stringify(order))}
                          <p>Event name : {order.eventId.name}</p>
                          <p>Event description : {order.eventId.description}</p>
                          <p>Ticket price : {order.eventId.price / 100} SGD</p>
                          <p>Seller contact : {order.seller.email}</p>
                          <p>Seller stripe ref : {order.stripeRef}</p>
                          <p>Ticket purchase time : {(order.created_at).slice(0, 16)}</p>
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  ))}
                </div>
              ) : (<p>No items purchased</p>)}
            </div>
            <br />
            <h3>Tickets Sold</h3>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {this.state.details.sellingHistory.length > 0 ? (
                <div style={{ width: '80%' }}>
                  {this.state.details.sellingHistory.map((order) => (
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                          <Typography><p>{moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p></Typography>
                          <Typography>{order.payedOut ? (<p style={{ color: 'green' }}>PAID</p>) : (<p style={{ color: 'red' }}>PAYMENT PENDING</p>)}</Typography>
                        </div>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography style={{ margin: 'auto' }}>
                          {console.log("derek helping " + JSON.stringify(order))}
                          <p>Event name : {order.eventId.name}</p>
                          <p>Event description : {order.eventId.description}</p>
                          <p>Ticket price : {order.eventId.price / 100} SGD</p>
                          <p>Seller contact : {order.seller.email}</p>
                          <p>Seller stripe ref : {order.stripeRef}</p>
                          <p>Ticket purchase time : {(order.created_at).slice(0, 16)}</p>
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  ))}
                </div>
              ) : (<p>No Tickets sold</p>)}
            </div>
          </div>
        ) : (
            <CircularProgress />
          )}
      </div>
    )
  }
}
