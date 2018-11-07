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

// let counter = 0;
// function createData(name, calories, fat) {
//     counter += 1;
//     return { id: counter, name, calories, fat };
// }

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
            rows: responses.data,
            searchResult: responses.data
        })
        console.log("updated state")
        console.log(this.state.rows)
    }
    async componentDidMount() {
        this.getImages()
        this.onSearchTextChange = this.onSearchTextChange.bind(this)
        this.filterVenues = this.filterVenues.bind(this)
    }

    state = {
        rows: [],
        page: 0,
        rowsPerPage: 5,
        seachText: "",
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
        this.setState({ seachText: event.target.value })
    }

    filterVenues(venues, searchText) {
        console.log("venues")
        console.log(venues)
        console.log("searchText")
        console.log(searchText)
        let returnVenues = [];
        let reg = new RegExp(`${searchText}`, 'i');
        venues.forEach((searchVenue, i) => {
            console.log("searchVenue name")
            console.log(searchVenue.name)
            if (searchVenue.name.match(reg)) {
                returnVenues.push(searchVenue)
            }
        })
        console.log("returnVenues")
        console.log(returnVenues)
        this.setState({ searchResult: returnVenues })
        console.log("console.log(this.state.rows)")
        console.log(this.state.searchResult)
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
                                value=""
                                onChange={(value) => this.setState({ seachText: value })}
                                onRequestSearch={() => this.filterVenues(this.state.rows, this.state.seachText)}
                                style={{
                                    margin: '0 auto',
                                    maxWidth: 800,
                                }}
                            />
                        </MuiThemeProvider>


                        <GridList cols={5} style={{ paddingTop: 30 }} >
                            <Table className={classes.table}>
                                <TableBody>
                                    {searchResult
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(row => {
                                            return (
                                                <GridListTile key={row.img}>
                                                    <img src={row.image} alt={row.name} width="100%" />
                                                    <GridListTileBar
                                                        title={row.name}
                                                        subtitle={<span>{row.location}</span>}
                                                    />
                                                </GridListTile>
                                            );
                                        })}
                                    {/* {emptyRows > 0 && (
                                    <TableRow style={{ height: 48 * emptyRows }}>
                                        <TableCell colSpan={2} />
                                    </TableRow>
                                )} */}
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
