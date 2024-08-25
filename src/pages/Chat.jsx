import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from "socket.io-client";
import { FaBars } from 'react-icons/fa'; // Icon for the hamburger menu

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContacts, setShowContacts] = useState(false); // State to toggle contacts visibility

  useEffect(() => {
    async function fetchUser() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    }
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const user = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(user.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    fetchData();
  }, [currentUser, navigate]);

  const handleChange = (chat) => {
    setCurrentChat(chat);
    setShowContacts(false); // Hide contacts when a chat is selected
  };

  const toggleContacts = () => {
    setShowContacts(!showContacts); // Toggle the visibility of contacts
  };

  return (
    <Container>
      <div className="container">
        {/* Hamburger Menu for Mobile Screens */}
        <HamburgerMenu onClick={toggleContacts}>
          <FaBars />
        </HamburgerMenu>

        {/* Contacts Section */}
        <ContactsSection showContacts={showContacts}>
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChange} />
        </ContactsSection>

        {/* Chat Section */}
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 40% 60%;
    }
    @media screen and (max-width: 720px) {
      grid-template-columns: 100%;
    }
  }
`;

// Hamburger Menu Style
const HamburgerMenu = styled.div`
  display: none;
  color: white;
  position: absolute;
  top: 15px;
  left: 15px;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;

  @media screen and (max-width: 720px) {
    display: block;
  }
`;

// Contacts Section Style
const ContactsSection = styled.div`
  display: ${({ showContacts }) => (showContacts ? 'block' : 'none')};
  height: 100%;
  background-color: #1e1e30;

  @media screen and (min-width: 720px) {
    display: block;
  }
`;

export default Chat;
