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
import ListSubheader from '@material-ui/core/ListSubheader';
import { CircularProgress } from '@material-ui/core/';
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import EventElement from '../components/molecules/EventElement'
import '../App.css'


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

    async getUser() {
        let response = await api.get('/personal/getUserEmail')
        console.log("the user email is " + response.data[0].email)
        let userEmail = response.data[0].email
        this.setState({ userEmail: userEmail })
    }


    async componentDidMount() {
        await this.getImages()
        await this.getUser()
        this.onSearchTextChange = this.onSearchTextChange.bind(this)
        this.filterEvents = this.filterEvents.bind(this)
        console.log("state after did mount: " + this.state.userEmail)
    }

    state = {
        events: [],
        page: 0,
        rowsPerPage: 5,
        searchText: "",
        searchResult: [],
        userEmail: "",
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
        console.log("what is the props ???" + JSON.stringify(this.props))
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
                                                    <EventElement
                                                        row={row}
                                                        classes={classes}
                                                    />
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
