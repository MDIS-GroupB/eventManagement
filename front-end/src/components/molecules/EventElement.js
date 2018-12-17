import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import Info from 'material-ui/svg-icons/action/info';
import * as exportFunc from './PaymentDialog'
import StripeButton from './StripeButton';
import { Link, BrowserRouter } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';


export default class myThing extends React.Component {
    state = {

    }

    async componentDidMount() {

    }

    render() {
        console.log("the ppassed props " + JSON.stringify(this.props.row.eventData))
        return (
            <>
                <GridListTile style={{ maxWidth: '33%' }}>
                    <img src={this.props.row.eventData.venueId.image} alt={this.props.row.eventData.name} width="100%" />

                    <GridListTileBar
                        title={<span style={{ marginLeft: 80 }}>{this.props.row.eventData.name}</span>}
                        subtitle={<>
                            <span style={{ marginLeft: 80 }}>{this.props.row.eventData.dateAndTime}</span><br />
                            <span style={{ marginLeft: 80 }}>Tickets Left : {this.props.row.eventData.noOfTickets}</span><br />
                            <span style={{ marginLeft: 80 }}>{parseInt(this.props.row.eventData.price) / 100} SGD</span><br />
                            <span style={{ marginLeft: 80 }}>{this.props.row.proposer.firstName}</span>
                            <span style={{ marginLeft: 5 }} > {this.props.row.proposer.lastName}</span><br />
                        </>
                        }
                        actionIcon={
                            <>
                                <Link to={`/Event/${this.props.row.eventData._id}`} >
                                    <IconButton style={{ right: 450 }}>
                                        <Info style={{ color: 'white' }} />
                                    </IconButton>
                                </Link>
                                <IconButton>
                                    <StripeButton
                                        name={this.props.row.eventData.name}
                                        description={this.props.row.eventData.description}
                                        date={this.props.row.eventData.dateAndTime}
                                        location={this.props.row.eventData.venueId.location}
                                        hoster={this.props.row.proposer.firstName + ' ' + this.props.row.proposer.lastName}
                                        amount={this.props.row.eventData.price}
                                        ticket={this.props.row.eventData.noOfTickets}
                                        eventId={this.props.row.eventData._id}
                                        email={this.state.userEmail}
                                        currency='SGD'
                                    />
                                </IconButton>
                            </>
                        }
                    />
                </GridListTile>
            </>
        )
    }
}