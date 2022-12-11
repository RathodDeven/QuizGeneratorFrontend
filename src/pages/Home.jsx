import Form from './Form';
import {useState} from 'react';
import Button from '@mui/material/Button';
import { Box, Typography } from "@mui/material";

const Home = () => {
  const [isShown, setIsShown] = useState(false);

  function handleClick(e) {
    setIsShown(true);

  }
    return (
      <Box style={{ fontFamily: "Source Sans Pro", fontSize: '16px', textAlign: 'center'}}>
        <Typography className="title" fontSize={40}>
          Quiz Generator
        </Typography>
        <Typography className="description" textalign="center" fontSize={20}>
            Welcome to Quiz Generator. Are you ready to get started?
        </Typography>
        <Button variant="contained"
                className="button"
                onClick={handleClick}
                color="secondary"
                size='large'>
          Get Started
        </Button>
        {isShown && <Form />}
      </Box>
    );

  };
  export default Home;