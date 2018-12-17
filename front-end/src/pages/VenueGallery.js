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
import CreateEventDialog from '../components/organisms/CreateEventDialog'
import '../App.css'
import VenueElement from '../components/molecules/VenueElement'
import * as exportFunc from '../components/organisms/CreateEventDialog'
import IconButton from '@material-ui/core/IconButton';
import Create from 'material-ui/svg-icons/content/create';


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


class CustomPaginationActionsTable extends React.Component {
    async getImages() {
        let responses = await api.get(`/venue`)
        this.setState({
            venues: responses.data,
            searchResult: responses.data
        })
        console.log("updated state")
        console.log(this.state.venues)
    }
    async componentDidMount() {
        this.getImages()
        this.onSearchTextChange = this.onSearchTextChange.bind(this)
        this.filterVenues = this.filterVenues.bind(this)
    }

    state = {
        venues: [],
        page: 0,
        rowsPerPage: 6,
        searchText: "",
        searchResult: [],
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

    filterVenues(value) {
        this.setState({ searchText: value }, () => {
            let venues = this.state.venues
            let searchText = this.state.searchText
            let returnVenues = [];
            let reg = new RegExp(`${searchText}`, 'i');
            venues.forEach((searchVenue, i) => {
                if (searchVenue.name.match(reg)) {
                    returnVenues.push(searchVenue)
                }
            })
            this.setState({ searchResult: returnVenues })
        })
    }

    onHandleCreateEvent = async () => {
        await this.setState({ openDialog: true })
        console.log("openDialog status")
        console.log(this.state.openDialog)
        exportFunc.handleClickOpen(this.state.openDialog)
    }

    render() {
        const { searchResult, rowsPerPage, page } = this.state;
        const emptyRows =
            rowsPerPage - Math.min(rowsPerPage, searchResult.length - page * rowsPerPage);

        return <>
            {this.state.searchResult ? (
                <Paper >
                    <div >
                        <ListSubheader component="div">Venues</ListSubheader>

                        <SearchBar
                            onChange={
                                (value) => this.filterVenues(value)
                            }

                            style={{
                                margin: '0 auto',
                                maxWidth: 800,
                            }}
                        />

                        <div>
                            <GridList cols={5} style={{ paddingTop: 20 }}> //GridList property not working

                                {searchResult
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(row => {
                                        return (
                                            <>
                                                <VenueElement
                                                    row={row}
                                                    onHandleCreateEvent={this.onHandleCreateEvent}
                                                >
                                                    <CreateEventDialog
                                                        button={<IconButton color="primary" aria-label="Add">
                                                            <Create />
                                                        </IconButton>}
                                                        openDialog={this.state.openDialog}
                                                        selectedVenue={row.name}
                                                        selectedVenueId={row._id}
                                                        style={{ flexDirection: 'row' }} />
                                                </VenueElement>
                                            </>
                                        );
                                    })}
                            </GridList>
                        </div>


                        <TablePagination
                            colSpan={3}
                            count={searchResult.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActionsWrapped}
                            rowsPerPageOptions={[6, 12, 18, 24]}
                        />

                    </div>
                </Paper>) : (<CircularProgress />)}
        </>
    }
}


export default CustomPaginationActionsTable;
