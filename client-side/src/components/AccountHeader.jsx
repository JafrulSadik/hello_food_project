import React from 'react';
import styled from 'styled-components';
import { desktop } from '../responsive';
import profileIcon from '../images/blank-profile-picture-973460_640-removebg-preview.png'

const AccountHeader = () => {
    return (
        <AHContainer>
            <section className='topContainer'>
                    <div className="imgDiv">
                        <img src={profileIcon} alt="" />
                    </div>
                    <div className="textDiv">
                        <h3>User Name</h3>
                        <p>username@gmail.com</p>
                    </div>
            </section>
        </AHContainer>
    );
};

const AHContainer = styled.div`
    .topContainer {
        width: 100%;
        background-color: #3bb54a;
        height: 270px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        ${desktop({
            width : '60%',
            margin : '0 auto'
        })}
    }
    .topContainer > .imgDiv {
        background-color: #D7D7D7;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .topContainer > .imgDiv > img {
        width: 80%;
        height: 70%;
    }
    .topContainer > .textDiv {
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 10px;
        color: #f0ecec;
    }
    .topContainer > .textDiv > p {
        font-size: 18px;
    }
`

export default AccountHeader;