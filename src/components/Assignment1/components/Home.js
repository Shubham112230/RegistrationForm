import React from 'react'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function Home() {

  const navigate = useNavigate();
  return (
    <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/Assignment1")}
        style={{ marginBottom: "20px" }}
      >
        Back
      </Button>
  )
}
