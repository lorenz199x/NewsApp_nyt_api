import React, { useState, useEffect } from 'react';
import { List, Text } from 'native-base';
import { Alert, View, ActivityIndicator, ScrollView, StyleSheet, Dimensions, Platform, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import DataItem from '../components/dataItem'
import Modal from '../components/modal';
import PickerItem from '../components/pickerItem'

import { getArticles } from '../service/news'
import { location, globalTags, keywords } from '../config/global_constant';

import Chips from '../styles/Chips'

const ListThumbnail = () => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isSetModalVisible, setModalVisible] = useState(false);
  const [modalArticleData, setModalArticleData] = useState({});
  const [isTag, setTag] = useState('home')
  const [isLocation, setLocation] = useState('')
  const [isKeyword, setKeyword] = useState('')

  const initialMapState = globalTags
  const [state, setState] = useState(initialMapState);

  const handleItemDataOnPress = (articleData) => {
    setModalVisible({ isSetModalVisible: true })
    setModalArticleData({ modalArticleData: articleData });
  }

  const handleModalClose = () => {
    setModalVisible({ isSetModalVisible: false })
    setModalArticleData({ modalArticleData: {} });
  }


  useEffect(() => {
    getArticles(isTag).then(data => {
      setLoading({ isLoading: false })
      storeData(data)
      // setData(data)
      retrieveData()

    }, error => {
      console.log('error', error)
      retrieveData()
      // Alert.alert('Error', 'Please Check your Internet Connection')
      ToastAndroid.show("Please Check your Internet Connection !", ToastAndroid.LONG, ToastAndroid.BOTTOM);

    })
  }, [isTag])

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@nyt_list', jsonValue)
    } catch (e) {
      console.log('error saving on local storage')
    }
  }

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@nyt_list');
      if (value !== null) {
        const newTag = isTag.charAt(0).toLowerCase() + isTag.slice(1)

        let filteredData = JSON.parse(value).filter((item) => {
          return item.section === newTag
        });

        console.log('filteredData', filteredData);
        if (Array.isArray(filteredData) && filteredData.length) {
          setData(filteredData)
        } else {
          setData(JSON.parse(value))
        }
        return value
      }
    } catch (error) {
      console.log('error fething on local storage')
    }
  };

  const selectedTag = (tag) => {
    setTag(tag)
  }

  console.log('data', data)

  let renderList = !isLoading ? (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator animating={isLoading} color="#00f0ff" />
      <Text style={{ marginTop: 10 }} children="Please Wait.." />
    </View>
  ) : (
      <List
        dataArray={data === null ? [] : data}
        keyExtractor={(item, index) => index.toString()}
        renderRow={(item, index) => {
          return <DataItem onPress={handleItemDataOnPress} data={item} index={index.toString()} />

        }}
      />
    )

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: '#cbd1d1' }}>
        <Text>Section</Text>
        <ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          height={50}
          style={styles.chipsScrollView}
          contentInset={{
            // iOS only
            top: 0,
            left: 0,
            bottom: 0,
            right: 20,
          }}
          contentContainerStyle={{
            paddingRight: Platform.OS === 'android' ? 20 : 0,
          }}>
          {state.categories.map((category, index) => (
            <Chips index={index} category={category} onSelectedTag={() => selectedTag(category.name)} />
          ))}
        </ScrollView>
      </View>


      <View style={{ flexDirection: 'row', backgroundColor: '#cbd1d1' }}>
        <View style={{ width: '50%', height: 50, backgroundColor: '#f0f0f0' }}>
          <PickerItem selectedItem={isLocation} onSelectItem={(val) => setLocation(val)} list={location} />
        </View>
        <View style={{ width: '50%', height: 50, backgroundColor: '#f0f0f0' }}>
          <PickerItem selectedItem={isKeyword} onSelectItem={(val) => setKeyword(val)} list={keywords} />
        </View>
      </View>

      <View style={{ flex: 6, backgroundColor: '#ffffff' }} >
        {renderList}
      </View>
      <Modal
        showModal={isSetModalVisible}
        articleData={modalArticleData}
        onClose={handleModalClose}
        data={data}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'steelblue',
    flexDirection: 'column'
  },

  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 40, // android 80 original
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
});

export default ListThumbnail