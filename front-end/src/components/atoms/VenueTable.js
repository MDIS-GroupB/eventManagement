import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

// function getSorting(order, orderBy) {
//   return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
// }

const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'location', numeric: true, disablePadding: false, label: 'Location' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            Select
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                styles={{ width: '1%' }}
                key={row.id}
                numeric={row.numeric}
              >
                {row.label}
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    selected: [],
    page: 0,
    rowsPerPage: 5,
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { order, rowsPerPage, page } = this.state;
    const data = this.props.venues
    return (
      <Paper >
        <div >
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              // numSelected={selected.length}
              order={order}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow
                      hover
                      onClick={event => this.props.onVenueSelect(n)}
                      role="checkbox"
                      aria-checked={n._id === this.props.selectedVenue._id}
                      tabIndex={-1}
                      key={n._id}
                      selected={n._id === this.props.selectedVenue._id}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={n._id === this.props.selectedVenue._id} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.name}
                      </TableCell>
                      <TableCell numeric>{n.location}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper >
    );
  }
}

export default EnhancedTable;