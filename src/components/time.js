//import libraries
import React, { useState, useEffect } from 'react';
import { Text } from 'native-base';
import moment from 'moment';

const Time = (props) => {
  const { time } = props

  const isTime = moment(time || moment.now()).fromNow();

  return (
    <Text note style={{ marginHorizontal: 10 }}>{isTime}</Text>
  );
}

export default Time;