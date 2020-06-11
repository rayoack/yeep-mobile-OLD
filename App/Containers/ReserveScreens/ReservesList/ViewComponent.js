import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { translate } from '../../../Locales'
import { CardsList, Header } from '../../../Components'
import { Images, Colors } from 'App/Theme'

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
        <CardsList
          data={forApproval}
          loading={loading}
          emptyType={'emptyFeedback'}
          onPress={onPress}
          onRefresh={refreshMyReserves}
          refreshing={refreshing}
        />
      )
    case 'second':
      return (
        <CardsList
          data={awaitingPayment}
          loading={loading}
          emptyType={'emptyFeedback'}
          onPress={onPress}
          onRefresh={refreshMyEvents}
          refreshing={refreshing}
        />
      )
    default:
      return (
        <CardsList
          data={completed}
          loading={loading}
          emptyType={'emptyFeedback'}
          onPress={onPress}
          onRefresh={refreshMyEvents}
          refreshing={refreshing}
        />
      )
  }
}

const renderTabBar = (props) => {
  const currentTabIndex = props.navigationState.index
  return (
    <TabBar 
      contentContainerStyle={{ backgroundColor: 'red' }}
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
    { key: 'first', title: translate('upcomingEventsLabel') },
    { key: 'second', title: translate('pastEventsLabel') },
    { key: 'third', title: translate('noDateEventsLabel') },
  ])

  return (
    <Container>
      <Header />

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