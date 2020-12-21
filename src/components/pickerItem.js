import React from 'react'
import { Icon, Picker, Item } from 'native-base';

const PickerItem = (props) => {
  const { selectedItem, onSelectItem, list } = props 
  return (
    <Item picker>
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        style={{ width: undefined }}
        placeholder="Select your SIM"
        placeholderStyle={{ color: "#bfc6ea" }}
        placeholderIconColor="#007aff"
        selectedValue={selectedItem}
        onValueChange={(val) => onSelectItem(val)}
      >
        {
          list.map((item) => {
            return <Picker.Item label={item.label} value={item.value} />
          })
        }
      </Picker>
    </Item>
  )
}

export default PickerItem
