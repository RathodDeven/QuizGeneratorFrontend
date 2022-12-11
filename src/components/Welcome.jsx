import {useState} from 'react';
import Button from '@mui/material/Button';

const Welcome = () =>{
    return (
        <div style={{ fontFamily: 'sans-serif', fontSize: '16px', textAlign: 'center' }}>
          <h1 className="title">Quiz Generator</h1>
          <p className="description">
            Welcome to the Sitecore Personalization Quiz! This quiz will help you determine how well your website is currently personalized for your audience. Are you ready to get started?
          </p>
          <Button variant="contained" className="button"  onClick={handleClick}>Get Started</Button>
          {isShown && <Form />}
        </div>
      );

};