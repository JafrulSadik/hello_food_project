import { faCartShopping, faHouse, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';
import { BiLeftArrowAlt } from "react-icons/bi";
import styled from 'styled-components';
import { tablet } from "../responsive";


const Wrapper = styled.div`
    display: none;
    position: relative;
    width: 100vw;
    height: 60px;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    border-radius: 10px 10px 0px 0px;
    box-shadow: 0 -1px 10px rgba(59, 59, 59, 0.111);
    z-index: 10;

    ${tablet({
      display: "block"
    })}
  `

  const Menu = styled.ul`
    position: relative;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
  `

  const List = styled.li`
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    list-style: none;
    color: gray;
  `

  const Icon = styled.a`
    text-decoration: none;
    color: gray;
    font-size: 1.1rem;
  `

  const Text = styled.a`
    color: gray;
    text-decoration: none;
    font-size: 12px;
    color: gray;
  `

  const SearchScreen = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 65px;
    width: 100vw;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(-100px);
    z-index: 11;
  `

  const SearchBar = styled.div`
    width: 85%;
    height: 40px;
    display: flex;
    align-items: center;
  `

  const Exit = styled.div`
    font-size: 1.5rem;
    width: 30px;
    text-align: center;
    color: #3bb77d;
  `

  const InputDiv = styled.input`
    width: 100%;
    border: none;
    padding-left: 5px;
    outline: none;
    color: gray;
    font-size: 14px;
    height: 100%;
    border: 1px solid #3bb77d;
    border-radius: 10px;
    padding: 0px 15px;
    font-size: 12px;
  `

const MobileMenu = () => {

  const [search, setSearch] = useState()
  
  const handleSearch = (props) => {

    if(props){
      setSearch({
        "transform": "translateY(0px)",
        "position" : "fixed",
        "transitionDuration" : "0.5s"
      })
    } else {
      setSearch({
          "transform": "translateY(-100px)",
          "transition" : "0.5s"
        })
    }
  }
  

  return (

    <>
      <Wrapper>
        <Menu>
          <List>
            <Icon href='/'>
              <FontAwesomeIcon icon={faHouse} />
            </Icon>
            <Text href='/'>
              Home
            </Text>
          </List>

          <List>
            <Icon onClick={() => handleSearch("searchBtn")}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Icon>
            <Text onClick={() => handleSearch("searchBtn")}>
              Search
            </Text>
          </List>

          <List>
            <Icon href='/cart'>
              <FontAwesomeIcon icon={faCartShopping} />
            </Icon>
            <Text href='/cart'>
              Cart
            </Text>
          </List>

          <List>
            <Icon href='/account' >
              <FontAwesomeIcon icon={faUser} />
            </Icon>
            <Text href='/account'>
              Account
            </Text>
          </List>


        </Menu>
      </Wrapper>

      <SearchScreen style={search}>
        <SearchBar>
          <Exit onClick={() => handleSearch()}><BiLeftArrowAlt/></Exit>
          <InputDiv placeholder='Input here...'/>
        </SearchBar>
      </SearchScreen>
    </>
  )
}

export default MobileMenu