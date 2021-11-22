import React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const WorkoutCountTable = ({
  totalWorkoutCount,
  monthlyWorkoutCount,
}) => (
  <Table sx={{ marginBottom: '20px' }}>
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell align="center">This Month</TableCell>
        <TableCell align="center">All Time</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Workouts</TableCell>
        <TableCell align="center">{monthlyWorkoutCount}</TableCell>
        <TableCell align="center">{totalWorkoutCount}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

WorkoutCountTable.propTypes = {
  totalWorkoutCount: PropTypes.number.isRequired,
  monthlyWorkoutCount: PropTypes.number.isRequired,
};

export default WorkoutCountTable;
