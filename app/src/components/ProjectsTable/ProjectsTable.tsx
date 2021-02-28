import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { ProjectsTableProps } from './types';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
  },
  tableCell: {
    borderBottom: 'none',
  },
  tableCellProject: {
    cursor: 'pointer',
  },
});

const ProjectsTable: React.FC<ProjectsTableProps> = ({ rows }) => {
  const history = useHistory();
  const location = useLocation();

  const classes = useStyles();

  const handleClickProject = (key: string, id: string) => {
    history.push(`${location.pathname}/${key}/boards/${id}`);
  };

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Key</TableCell>
            <TableCell>Lead</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell
                className={`${classes.tableCell} ${classes.tableCellProject}`}
                onClick={() => handleClickProject(row.key, row.id)}
              >
                {row.name}
              </TableCell>
              <TableCell className={classes.tableCell}>{row.key}</TableCell>
              <TableCell className={classes.tableCell}>{row.lead}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectsTable;