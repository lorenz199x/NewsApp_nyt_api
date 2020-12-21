import React from 'react';
import ListSCreen from './Screen/ListScreen';
import { Container, Header, Title, Body } from "native-base";

const Entry = () => {
  return (
    <Container>
        <Header noLeft style={{backgroundColor: "#3172d4"}} >
          <Body>
            <Title>News App</Title>
          </Body>
        </Header>
        <ListSCreen />
      </Container>


  );
};

export default Entry;
