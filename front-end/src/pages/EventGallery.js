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
import CreateEventDialog from '../components/organisms/CreateEventDialog'
import { Link, BrowserRouter } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import '../App.css'
import StarBorderIcon from '@material-ui/icons/StarBorder';

import IconButton from '@material-ui/core/IconButton';

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
        let responses = await api.get(`/event/all`)
        this.setState({
            events: responses.data,
            searchResult: responses.data
        })
        console.log("updated state")
        console.log(this.state.events)
    }
    async componentDidMount() {
        this.getImages()
        this.onSearchTextChange = this.onSearchTextChange.bind(this)
        this.filterEvents = this.filterEvents.bind(this)
    }

    state = {
        events: [],
        page: 0,
        rowsPerPage: 5,
        searchText: "",
        searchResult: []
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
                if (searchEvent.name.match(reg)) {
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

                        <GridList cols={5} style={{ paddingTop: 20 }}>
                            <Table className={classes.table}>
                                <TableBody>
                                    {searchResult
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(row => {
                                            return (
                                                <>
                                                    <GridListTile key={row.img} >
                                                        {/* <BrowserRouter><Link to={`/venue/${row._id}`}>View Me</Link></BrowserRouter> */}
                                                        {/* {console.log(row.venueId.image)} */}
                                                        <img src={row.venueId.image} alt={row.name} width="100%" />
                                                        <GridListTileBar
                                                            title={row.name}
                                                            subtitle={<span>{row.dateAndTime}</span>}
                                                        />

                                                    </GridListTile>
                                                    <MuiThemeProvider className='rowC'>
                                                        <Link to={`/Event/${row._id}`} ><RaisedButton>View Event Detail</RaisedButton></Link>
                                                    </MuiThemeProvider>
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
