import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Logo from "../assets/logo.svg"

function Contacts({contacts, currentUser, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const[currentUserImage, setCurrentUserImage] = useState(undefined);
    const[currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if(currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }


    }, [currentUser]);

    const changeCurrentChat = (index, contact)=> {
        setCurrentSelected(index);
        changeChat(contact);
    };
  return (
    <>
        {currentUserImage && currentUserName && (
            <Container>
                <div className="brand">
                    <img src={Logo} alt ="logo" />
                    <h3>CHATTINGKROO</h3>
                </div>
                <div className="contacts">
                    {
                        contacts.map((contact, index) => {
                            return(
                                <div 
                                className={`contact  ${index === currentSelected ? 'selected' : ''}`  }
                                key = {index}
                                onClick={() => 
                                changeCurrentChat(index, contact)}>
                                    <div className='avatar'>
                                    <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar"/> 
                                    </div>
                                    <div className="username">
                                       <h3>{contact.username}</h3> 
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="current-user">
                <div className='avatar'>
                                    <img src={`data:image/svg+xml;base64, ${currentUserImage}`} alt="user"/> 
                                    </div>
                                    <div className="username">
                                       <h2>{currentUserName}</h2> 
                                    </div>
                </div>
            </Container>
        )
}
    </>
  )
}

const Container = styled.div`
max-height: 100vh; /* Ensures it doesn’t exceed viewport height */
  overflow-y: auto; /* Adds scroll if content overflows */
  background-color: #1c1c1c; /* Adjust as needed */
display: grid;
grid-template-rows: 10% 75% 15%;
overflow: hidden;
background-color: #080420;
.brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
        height: 2rem;
    } 
    h3 {
        color: white;
        text-transform: uppercase;
    }
}
.contacts{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    .contact{
        background-color: #ffffff39;
        min-height: 5rem;
        width: 90%;
        cursor: pointer;
        border-radius: 0.2rem;
        padding: 0%.4rem;
        align-items: center;
        display: flex;
        transition: 0.5s ease-in-out;
        gap: 0.8rem; }
        &::-webkit-scrollbar {
            width: 0.2rem;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
        .avatar {
            img {
                height: 3rem;
            }
        }
        .username {
            h3 {
                color: white;
            }
        }
    }
        .selected {
            background-color: #9a90fa;
        }


    .current-user{
        background-color: #0d0d30;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        .avatar {
            img {
                height: 4rem;
                max-inline-size: 100%;
            }
        }
        .username {
            h2 {
                color: white;
            }
        }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        .current-user{

        
                gap: 0.1rem;
                .username {
                  h2{
                    font-size: 0.3rem;
                  }  
                }
            }
        }
    @media screen and (min-width: 320px) and (max-width: 720px) {
        .current-user{

                gap: 0.3rem;
                .username {
                  h2{
                    font-size: 0.3px;
                  }  
                }
            }     
        }
`;

export default Contacts;