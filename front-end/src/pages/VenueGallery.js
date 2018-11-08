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

    filterVenues(value) {
        this.setState({ searchText: value }, () => {
            let venues = this.state.venues
            let searchText = this.state.searchText
            let returnVenues = [];
            let reg = new RegExp(`${searchText}`, 'i');
            venues.forEach((searchVenue, i) => {
                // console.log("searchVenue name")
                // console.log(searchVenue.name)
                if (searchVenue.name.match(reg)) {
                    returnVenues.push(searchVenue)
                }
            })
            this.setState({ searchResult: returnVenues })
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
                        <ListSubheader component="div">Venues</ListSubheader>

                        <MuiThemeProvider>
                            <SearchBar
                                onChange={
                                    (value) => this.filterVenues(value)
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
                                                        <img src={row.image} alt={row.name} width="100%" />
                                                        <GridListTileBar
                                                            title={row.name}
                                                            subtitle={<span>{row.location}</span>}
                                                        />

                                                    </GridListTile>
                                                    <MuiThemeProvider className='rowC'>
                                                        <CreateEventDialog selectedVenue={row.name} selectedVenueId={row._id} style={{ flexDirection: 'row' }} />
                                                        <Link to={`/Venue/${row._id}`} ><RaisedButton>View Venue Detail</RaisedButton></Link>
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
