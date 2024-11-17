import * as React from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'userName', label: 'Name', minWidth: 120 },
  { id: 'id', label: 'Id', minWidth: 80 },
  { id: 'gender', label: 'Gender', minWidth: 80, align: 'center' },
  { id: 'memberShip', label: 'Membership Package', minWidth: 80, align: 'center' },
  { id: 'expiryDate', label: 'Expiry Date', minWidth: 80, align: 'center' },
  { id: 'paymentStatus', label: 'Payment Status', minWidth: 80, align: 'center' },
];

export default function StickyHeadTable() {
  const [members, setMembers] = React.useState([]); // State to store fetched members
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Fetch all members when the component mounts
  React.useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/member/getAllMembers'); // Make API call
        setMembers(response.data); // Set the state with the fetched data
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
    fetchMembers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '90%', mx: 'auto', overflow: 'hidden' }}> {/* Center the table with mx:auto */}
      <TableContainer sx={{ maxHeight: 440, width: '90%', mx: 'auto' }}> {/* Adjust the table width */}
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {members
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                // Ensure unique key by combining row.id with index
                const rowKey = row.id + '-' + index;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowKey}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={members.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
