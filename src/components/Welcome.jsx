import React from 'react';
import styled from 'styled-components';
import Robot from '../assets/robot.gif';

const Welcome = ({ currentUser }) => {
  return (
    <Container>
      <Content>
        <img src={Robot} alt="Robot" />
        <h1>
          Welcome, <span>{currentUser.username}!</span>
        </h1>
        <h3>Please select a chat to start messaging.</h3>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #131324;
  color: white;
  overflow: hidden; /* Prevents unwanted scrolling */
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;

  img {
    height: 20rem;
    width: auto;
    margin-bottom: 1rem;
    @media screen and (max-width: 768px) {
      height: 15rem;
    }
    @media screen and (max-width: 480px) {
      height: 12rem;
    }
  }
  
  h1 {
    font-size: 2rem;
    margin: 1rem 0;
    @media screen and (max-width: 768px) {
      font-size: 1.5rem;
    }
    @media screen and (max-width: 480px) {
      font-size: 1.2rem;
    }
  }
  
  h3 {
    font-size: 1.2rem;
    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
    @media screen and (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  span {
    color: #4e0eff;
  }
`;

export default Welcome;
