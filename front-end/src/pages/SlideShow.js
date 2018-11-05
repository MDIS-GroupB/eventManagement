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
        overflowX: "auto"
    }
});

class CustomPaginationActionsTable extends React.Component {
    async getImages() {
        let responses = await api.get(`/venue`)
        this.setState({
            rows: responses.data
        })
        console.log("updated state")
        console.log(this.state.rows)
    }
    async componentDidMount() {
        this.getImages()
    }

    state = {
        rows: [
            // createData("Cupcake", 305, 3.7),
            // createData("Donut", 452, 25.0),
            // createData("Eclair", 262, 16.0),
            // createData("Frozen yoghurt", 159, 6.0),
            // createData("Gingerbread", 356, 16.0),
            // createData("Honeycomb", 408, 3.2),
            // createData("Ice cream sandwich", 237, 9.0),
            // createData("Jelly Bean", 375, 0.0),
            // createData("KitKat", 518, 26.0),
            // createData("Lollipop", 392, 0.2),
            // createData("Marshmallow", 318, 0),
            // createData("Nougat", 360, 19.0),
            // createData("Oreo", 437, 18.0)
        ],
        page: 0,
        rowsPerPage: 5
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const { rows, rowsPerPage, page } = this.state;
        const emptyRows =
            rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

        return <>
            {this.state.rows ? (
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <ListSubheader component="div">Venues</ListSubheader>
                        <GridList cols={5} >
                            <Table className={classes.table}>
                                <TableBody>
                                    {rows
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
                                            count={rows.length}
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
