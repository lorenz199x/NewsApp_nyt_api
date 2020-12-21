import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, Share, Image, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { Container, Header, Content, Body, Left, Icon, Right, Title, Button, Card, CardItem, Thumbnail, Text } from 'native-base';

const webViewHeight = Dimensions.get('window').height - 56;

const ModalComponent = (props) => {

  const handleClose = () => {
    return props.onClose();
  }

  const handleShare = () => {
    const { url, title } = props.articleData.modalArticleData;
    message = `${title}\n\nRead More @${url}\n\nShared via News App`;
    return Share.share(
      { title, message, url: message },
      { dialogTitle: `Share ${title}` }
    );
  }

  const { showModal, articleData } = props;
  const url = articleData.modalArticleData?.url
  const title = articleData.modalArticleData?.title
  const abstract = articleData.modalArticleData?.abstract
  const byline = articleData.modalArticleData?.byline
  const multimedia = articleData.modalArticleData?.multimedia

  if (url != undefined) {
    return (
      <Modal
        animationType="slide"
        transparent
        visible={showModal.isSetModalVisible}
        onRequestClose={handleClose}
      >
        <Container style={styles.container}>
          <Content>
            <Card>
              <CardItem cardBody>
                <Image
                  source={{ uri: multimedia != null ? multimedia[1].url : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpajo6PFxcW3t7ecnJyqqqq+vr6xsbGXmO98AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABPUlEQVRoge3Tv0/CQBjG8YcWaMcebymOENLI2MZoHMHEvVUKjq1K4lhM2Kvxx7/tUUiamDhc6GSez8INzbf3HleAiIiIiIiIiIiIiNozAGzvuJYTW2reXmso7bX8YN96HUR1a7RZ6+VVOgU+p4LuZGrSkqK0PWfwfl+3ht/hcpdvPkJ0g0fBYpYZtS7HttfPMatbAbZzJ1kjjnqVK1ihNzdpdX3b65S4qVsjXbG9EtuoEzliC/RbDFoIL7wY2NZrQayPzw1VpH/FUUqNjVrx0+9W8Rzrlt7yMMvMWq7fzHhoCTp6Rr0vw0uiH8+as69bov/AyNqf/Rms3Ky1aO7EYV93X2nlBIXg7WVSmrWs5q4eWrvVdYLbpR4/PTeZ8S9O82mdzMr7SVstV6mqrRaKh9ZSRERERERERET0n/wAZwMqI9kyPcoAAAAASUVORK5CYII=' }}
                  style={{ height: 200, width: null, flex: 1 }}
                />
              </CardItem>

              <CardItem>
                <Left>
                  <Body>
                    <Text numberOfLines={2}>{title}</Text>
                    <Text note>{byline}</Text>
                  </Body>
                </Left>
              </CardItem>

              <CardItem>
                <Left>
                  <Body>
                    <Text note numberOfLines={10}>{abstract}</Text>
                  </Body>
                </Left>
              </CardItem>

              <CardItem>
                <Left />
                <Body>
                  <Button bordered onPress={handleClose}>
                    <Text>Back</Text>
                  </Button>
                </Body>
                <Right />
              </CardItem>

            </Card>
          </Content>

        </Container>
      </Modal>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 15, 
    backgroundColor: 'transparent'
  },

  ImageSize: {
    height: 200, 
    width: null, 
    flex: 1
  },

});

export default ModalComponent;

// <Content contentContainerStyle={{ height: webViewHeight }}>
//   <WebView source={{ uri: url }} style={{ flex: 1 }}
//   onError={handleClose} startInLoadingState
//   scalesPageToFit
//   />
// </Content>

// <Header style={{ backgroundColor: '#000000' }}>
//   <Left>
//     <Button onPress={handleClose} transparent>
//       <Icon name="close" style={{ color: 'white', fontSize: 12 }} />
//     </Button>
//   </Left>
//   <Body>
//     <Title children={articleData.modalArticleData.title} style={{ color: 'white' }} />
//   </Body>
//   <Right>
//     <Button onPress={handleShare} transparent>
//       <Icon name="share" style={{ color: 'white', fontSize: 12 }} />
//     </Button>
//   </Right>
// </Header>