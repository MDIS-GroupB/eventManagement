import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import TablePaginationActions from '../components/atoms/TablePaginationActions';
import api from '../api/init'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import { CircularProgress } from '@material-ui/core/';
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Link, BrowserRouter } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import '../App.css'
import IconButton from '@material-ui/core/IconButton';
import Info from 'material-ui/svg-icons/action/info';
import * as exportFunc from '../components/molecules/PaymentDialog'
import StripeButton from '../components/molecules/StripeButton';

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5
    }
});

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
    withTheme: true
})(TablePaginationActions);

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3
    },
    table: {
        minWidth: 700,
        margin: "auto"
    },
    tableWrapper: {
        // overflowX: "auto"
    }
});

class CustomPaginationActionsTable extends React.Component {
    async getImages() {
        let responses = await api.get(`/event/allWithHoster`)
        let approvedEvents = [];
        responses.data.forEach((approvedEvent, i) => {
            if (approvedEvent.eventData.status != undefined && approvedEvent.eventData.status.approved === true) {
                approvedEvents.push(approvedEvent)
            }
        })

        this.setState({
            events: approvedEvents,
            searchResult: approvedEvents
        })
        console.log("updated state")
        console.log(this.state.events)
    }
    async componentDidMount() {
        this.getImages()
        this.onSearchTextChange = this.onSearchTextChange.bind(this)
        this.filterEvents = this.filterEvents.bind(this)
        console.log("component did mount fired")
    }

    state = {
        events: [],
        page: 0,
        rowsPerPage: 5,
        searchText: "",
        searchResult: [],
        payment: false,
        openDialog: false
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    onSearchTextChange(event) {
        console.log(event.target.value)
        this.setState({ searchText: event.target.value })
    }

    filterEvents(value) {
        this.setState({ searchText: value }, () => {
            let events = this.state.events
            let searchText = this.state.searchText
            let returnEvents = [];
            let reg = new RegExp(`${searchText}`, 'i');
            events.forEach((searchEvent, i) => {
                // console.log("searchVenue name")
                // console.log(searchVenue.name)
                if (searchEvent.eventData.name.match(reg)) {
                    returnEvents.push(searchEvent)
                }
            })
            this.setState({ searchResult: returnEvents })
        })
    }

    render() {
        const { classes } = this.props;
        const { searchResult, rowsPerPage, page } = this.state;
        const emptyRows =
            rowsPerPage - Math.min(rowsPerPage, searchResult.length - page * rowsPerPage);

        return <>
            {this.state.searchResult ? (
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <ListSubheader component="div">Events</ListSubheader>

                        <MuiThemeProvider>
                            <SearchBar
                                onChange={
                                    (value) => this.filterEvents(value)
                                }
                                // onRequestSearch={() => this.filterVenues(this.state.venues, this.state.seachText)}
                                style={{
                                    margin: '0 auto',
                                    maxWidth: 800,
                                }}
                            />
                        </MuiThemeProvider>

                        <GridList cols={5} style={{ paddingBottom: 20 }}>
                            <Table className={classes.table}>
                                <TableBody>
                                    {searchResult
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(row => {
                                            console.log('row')
                                            console.log(row)
                                            return (
                                                <>
                                                    <GridListTile key={row.eventData.img} style={{ marginTop: 20 }}>
                                                        {/* <BrowserRouter><Link to={`/venue/${row.eventData._id}`}>View Me</Link></BrowserRouter> */}
                                                        {/* {console.log(row.eventData.venueId.image)} */}
                                                        <img src={row.eventData.venueId.image} alt={row.eventData.name} width="100%" />

                                                        <GridListTileBar
                                                            title={<span style={{ marginLeft: 80 }}>{row.eventData.name}</span>}
                                                            subtitle={<>
                                                                <span style={{ marginLeft: 80 }}>{row.eventData.dateAndTime}</span><br />
                                                                <span style={{ marginLeft: 80 }}>Tickets Left : {row.eventData.noOfTickets}</span><br />
                                                                <span style={{ marginLeft: 80 }}>{parseInt(row.eventData.price) / 100} SGD</span><br />
                                                                <span style={{ marginLeft: 80 }}>{row.proposer.firstName}</span>
                                                                <span style={{ marginLeft: 5 }} > {row.proposer.lastName}</span><br />
                                                                {/* alignment can be improved */}
                                                            </>
                                                            }
                                                            actionIcon={
                                                                <>
                                                                    <Link to={`/Event/${row.eventData._id}`} >
                                                                        <IconButton style={{ right: 550 }}>{/* alignment can be improved */}
                                                                            <Info className={classes.title} style={{ color: 'white' }} />
                                                                        </IconButton>
                                                                    </Link>
                                                                    <IconButton>
                                                                        <StripeButton
                                                                            name={row.eventData.name}
                                                                            description={row.eventData.description}
                                                                            date={row.eventData.dateAndTime}
                                                                            location={row.eventData.venueId.location}
                                                                            hoster={row.proposer.firstName + ' ' + row.proposer.lastName}
                                                                            amount={row.eventData.price}
                                                                            currency='SGD'
                                                                        />
                                                                    </IconButton>
                                                                </>
                                                            }
                                                        />
                                                    </GridListTile>
                                                </>
                                            );
                                        })}
                                </TableBody>

                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            colSpan={3}
                                            count={searchResult.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onChangePage={this.handleChangePage}
                                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                            ActionsComponent={TablePaginationActionsWrapped}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </GridList>
                    </div>
                </Paper>) : (<CircularProgress />)}
        </>
    }
}

CustomPaginationActionsTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomPaginationActionsTable);
