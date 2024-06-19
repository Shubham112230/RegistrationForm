import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../../Services/services';


export default function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleDataTableClick = async () => {
    try {
      const fetchedData = await getData();
      console.log(getData);
      setData(fetchedData);
      navigate('/data-table', { state: { data: fetchedData } });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Box display="flex" justifyContent="flex-start" alignItems="center" marginBottom="20px" marginTop="20px" marginLeft="20px" marginRight="20px">
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDataTableClick}
        style={{ marginBottom: "20px", paddingTop: "20px", paddingLeft: "20px" }}
      >
        Data Table
      </Button>
    </Box>
  );
}
