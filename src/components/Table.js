// Table.js

import React from "react";
import { useFilters, useGlobalFilter, useTable } from "react-table";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setFilter
      } = useTable(
        {
          columns,
          data
        },
        useFilters
      );

  const [filterInput, setFilterInput] = React.useState("");
  const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  }))(TableRow)

  // Update the state when input changes
  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("name", value);
    setFilterInput(value);
  };
  return (
      <div>
    <input
    value={filterInput}
    onChange={handleFilterChange}
    placeholder={"Search by name"}
    />
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render("Header")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <StyledTableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </StyledTableRow>
          );
        })}
      </TableBody>
    </MaUTable>
    </div>
  );
}