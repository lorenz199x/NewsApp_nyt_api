import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';

import styled from 'styled-components'

const Chips = (props) => {
  const { index, category, onSelectedTag } = props;
  return (
    <ChipsView key={index} style={styles.chipsItem} onPress={() => onSelectedTag(category.name)}>
      {category.icon}
      <Text>{category.name}</Text>
    </ChipsView>

    // <TouchableOpacity key={index} style={styles.chipsItem} onPress={() => onSelectedTag(category.name)}>
    //   {category.icon}
    //   <Text>{category.name}</Text>
    // </TouchableOpacity>

  )
}

const ChipsView = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #fff;
  border-radius: 20px;
  /* padding: 8px; */
  height: 90px;
`

const styles = StyleSheet.create({
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});

export default Chips
