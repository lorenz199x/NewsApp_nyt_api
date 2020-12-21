import React from 'react'
import { ListItem, Left, Thumbnail, Body, Text } from 'native-base';
import styled from 'styled-components'

const DataItem = (props) => {
  const { data, index } = props
  // console.log('data items', data.multimedia[1].url)

  const handlePress = () => {
    const { url, title, abstract, byline, multimedia} = data;
    props.onPress({ url, title, abstract, byline, multimedia });
  }

  return (
    <ListItem thumbnail button onPress={handlePress} key={index}>
      <Left>
        <Thumbnail square source={{ uri: data.multimedia != null ? data.multimedia[1].url : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpajo6PFxcW3t7ecnJyqqqq+vr6xsbGXmO98AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABPUlEQVRoge3Tv0/CQBjG8YcWaMcebymOENLI2MZoHMHEvVUKjq1K4lhM2Kvxx7/tUUiamDhc6GSez8INzbf3HleAiIiIiIiIiIiIiNozAGzvuJYTW2reXmso7bX8YN96HUR1a7RZ6+VVOgU+p4LuZGrSkqK0PWfwfl+3ht/hcpdvPkJ0g0fBYpYZtS7HttfPMatbAbZzJ1kjjnqVK1ihNzdpdX3b65S4qVsjXbG9EtuoEzliC/RbDFoIL7wY2NZrQayPzw1VpH/FUUqNjVrx0+9W8Rzrlt7yMMvMWq7fzHhoCTp6Rr0vw0uiH8+as69bov/AyNqf/Rms3Ky1aO7EYV93X2nlBIXg7WVSmrWs5q4eWrvVdYLbpR4/PTeZ8S9O82mdzMr7SVstV6mqrRaKh9ZSRERERERERET0n/wAZwMqI9kyPcoAAAAASUVORK5CYII=' }} />
      </Left>

      <Body>
        <Text numberOfLines={2}>{data.title}</Text>
        <Text note numberOfLines={2}>{data.abstract}</Text>

        <BodyView>
          <Text note>{data.byline}</Text>
        </BodyView>
      </Body>
    </ListItem>
  )
}

export default DataItem

const BodyView = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: 8px;
  margin-left: 0px
`;
