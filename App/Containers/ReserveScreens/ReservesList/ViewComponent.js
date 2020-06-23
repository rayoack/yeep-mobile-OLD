import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { translate } from '../../../Locales'
import { ChatList } from '../../../Components'

import {
  TabBar,
  Tab,
  TabText,
  Container,
  CreateEventButton
} from './styles';

const renderScene = (
  route,
  forApproval,
  awaitingPayment,
  completed,
  loading,
  onPress,
  refreshMyReserves,
  refreshing
) => {

  switch (route.key) {
    case 'first':
      return (
        <ChatList
          data={forApproval}
          loading={loading}
          onPress={onPress}
          onRefresh={refreshMyReserves}
          refreshing={refreshing}
        />
      )
    case 'second':
      return (
        <ChatList
          data={awaitingPayment}
          loading={loading}
          onPress={onPress}
          onRefresh={refreshMyReserves}
          refreshing={refreshing}
        />
      )
    default:
      return (
        <ChatList
          data={completed}
          loading={loading}
          onPress={onPress}
          onRefresh={refreshMyReserves}
          refreshing={refreshing}
        />
      )
  }
}

const renderTabBar = (props) => {
  const currentTabIndex = props.navigationState.index
  return (
    <TabBar 
      horizontal={true} 
      showsHorizontalScrollIndicator={false}>
      {props.navigationState.routes.map((route, i) => {
        const isFocused = currentTabIndex == i
        return (
          <Tab
            key={i.toString()}
            isFocused={isFocused}
            onPress={() => props.setIndex(i) }>
            <TabText isFocused={isFocused} children={route.title}/>
          </Tab>
        )
      })}
    </TabBar>
  )
}

const initialLayout = { width: Dimensions.get('window').width }

const ViewComponent = ({
  forApproval,
  awaitingPayment,
  completed,
  navigation,
  loading,
  navigateToReserveChat,
  refreshMyReserves,
  refreshing,
}) => {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: translate('waitingForApproval') },
    { key: 'second', title: translate('awaitingPayment') },
    { key: 'third', title: translate('completed') },
  ])

  return (
    <Container>
      <TabView
        navigationState={{ index, routes }}
        renderScene={({route}) => renderScene(
          route,
          forApproval,
          awaitingPayment,
          completed,
          loading,
          navigateToReserveChat,
          refreshMyReserves
        )}
        renderTabBar={(props) => {
          return renderTabBar({...props, setIndex})
        }}
        // sceneContainerStyle={{ backgroundColor: 'red' }}
        // indicatorStyle={{ backgroundColor: 'green' }}
        onIndexChange={index => setIndex(index)}
        initialLayout={initialLayout}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabBarContentContainerStyle : {
    height: 10,
  },
})

export default ViewComponent;