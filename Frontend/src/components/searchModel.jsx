import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

// Wrapper for the search input, icon, and button
const SearchWrapper = styled('div')({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  border: '2px solid #ed563b;', // Default border color
  borderRadius: '15px',
  overflow: 'hidden', // Ensure content stays within the rounded corners
  transition: 'border-color 0.3s',
  '&:hover': {
    borderColor: '#ed563b',
  },
  '&:focus-within': {
    borderColor: '#ed563b',
  },
});

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  padding: theme.spacing(1, 1, 1, 6), // Add padding to make space for the icon
  flex: 1, // Allow the input to grow
  '&::placeholder': {
    color: '#ed563b', // Placeholder color
    opacity: 1,
  },
}));

const SearchIconWrapper = styled('div')({
  position: 'absolute',
  left: '10px', // Adjust the icon's position inside the field
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ed563b',
});

const StyledButton = styled('button')({
  backgroundColor: '#ed563b',
  color: 'white',
  border: 'none',
  padding: '12px 20px',
  fontWeight: 'bold',
  borderRadius: '0 15px 15px 0', // Match the border radius of the wrapper
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#d04c36',
  },
  '&:focus': {
    outline: 'none', // Remove the focus outline
  },
});

const SearchField = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleInputChange = (e) => setSearchQuery(e.target.value);

  const handleSearch = () => {
    onSearch(searchQuery.trim());
  };

  return (
    <SearchWrapper>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
      />
      <StyledButton onClick={handleSearch}>Search</StyledButton>
    </SearchWrapper>
  );
};

export default SearchField;
