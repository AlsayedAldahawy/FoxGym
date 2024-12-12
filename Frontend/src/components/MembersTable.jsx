import * as React from "react";
import axios from "axios"; // Import axios for making HTTP requests
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import FilterSelect from "./FilterSelect";
import PropTypes from "prop-types";
import "../assets/css/membersTable.css"

const columns = [
  { id: "userName", label: "Name", minWidth: 120 },
  { id: "id", label: "Id", minWidth: 80 },
  { id: "phoneNumber", label: "Phone", minWidth: 80, align: "center" },
  { id: "gender", label: "Gender", minWidth: 80, align: "center" },
  {
    id: "memberShip",
    label: "MemberShip Package",
    minWidth: 80,
    align: "center",
  },
  { id: "expiryDate", label: "Expiry Date", minWidth: 80, align: "center" },
  {
    id: "remaining",
    label: "Remaining Payment",
    minWidth: 80,
    align: "center",
  },
  { id: "status", label: "Status", minWidth: 80, align: "center" }, // New column
];

export default function StickyHeadTable({ searchQuery }) {
  const [members, setMembers] = React.useState([]); // State to store fetched members
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalMembers, setTotalMembers] = React.useState(0); // For total count
  const [genderQuery, setGenderhQuery] = React.useState("");
  const [statusQuery, setStatusQuery] = React.useState("");
  const [membershipQuery, setMembershipQuery] = React.useState("");
  const [remainingQuery, setRemainingQuery] = React.useState(false)


  // Fetch all members when the component mounts
  React.useEffect(() => {
    const fetchMembers = async () => {
      try {
        const params = {
          page: page + 1,
          rowsPerPage,
          searchQuery: searchQuery.trim(),
          genderQuery,
          statusQuery,
          membershipQuery,
          remainingQuery
        };
        const response = await axios.get(
          "http://localhost:5000/member/getAllMembers",
          { params }
        );
        setMembers(response.data.members.reverse());
        setTotalMembers(response.data.totalMembers);
        // console.log("members", response.data.members)
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, [page, rowsPerPage, searchQuery, genderQuery, statusQuery, membershipQuery, remainingQuery]); // Re-run when page or rowsPerPage changes

  
  const handleGenderChange = (e) => {
    setGenderhQuery(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatusQuery(e.target.value);
  };
  const handleMembershipChange = (e) => {
    setMembershipQuery(e.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRemainingToggle = () => {
    setRemainingQuery(!remainingQuery)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "90%",
        mx: "auto",
        overflow: "hidden",
        border: "2px solid #ed563b",
      }}
    >
      <TableContainer sx={{ minHeight: 580, width: "90%", mx: "auto" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label === "Gender" ? (
                    <FilterSelect
                      label="Gender"
                      value={genderQuery}
                      options={['Male', 'Female']}
                      onChange={handleGenderChange}
                    />
                  ) : column.label === "Status" ? (
                    <FilterSelect
                      label="Status"
                      value={statusQuery}
                      options={["active", "inactive"]}
                      onChange={handleStatusChange}
                    />
                  ) 
                  : column.label === "MemberShip Package" ? (
                    <FilterSelect
                      label="MemberShip"
                      value={membershipQuery}
                      options={["Semi-monthly", "Monthly", "Quarterly", "Semi-annual", "Annual"]}
                      onChange={handleMembershipChange}
                    />
                  ) : column.label === "Remaining Payment" ? (
                    <button
                    id="remaining"
                    className={remainingQuery ? "filter-on" : "filter-off"}
                    onClick={handleRemainingToggle}>
                      Remaining Payment
                    </button>
                  ) 
                  : (
                    <FilterSelect
                      label={column.label}
                      value={membershipQuery}
                      options={[]}
                      disabled={true}
                      classd = "no-arrow"
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((row, index) => {
              const rowKey = row.id + "-" + index;
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowKey}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <Link to={`/member/${row.id}`}>
                          {/* {column.id == "remaining" ? <span >{value}</span> : "-"} */}
                          <span
                            className={`${value == "active" ? "active-status" : value == "inactive" || (column.id == "remaining" && value > 0) ? "inactive-status" : ""}`}
                          >
                            {value || "-"}
                          </span>
                        </Link>
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
        count={totalMembers} // Ensure this value is correct
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

StickyHeadTable.propTypes = { searchQuery: PropTypes.string.isRequired };
