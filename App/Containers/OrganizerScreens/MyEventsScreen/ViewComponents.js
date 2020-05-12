import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { translate } from '../../../Locales'

import { CardsList } from '../../../Components'

import {
  TabBar,
  Tab,
  TabText,
  Container,
} from './styles';

const renderScene = ( route, events, pastEvents, noDate, loading, onPress ) => {

  switch (route.key) {
    case 'first':
      return (
        <CardsList
          data={events}
          loading={loading}
          emptyType={'emptyFeedback'}
          onPress={onPress}
        />
      )
    case 'second':
      return (
        <CardsList
          data={pastEvents}
          loading={loading}
          emptyType={'emptyFeedback'}
          onPress={onPress}
        />
      )
    default:
      return (
        <CardsList
          data={noDate}
          loading={loading}
          emptyType={'emptyFeedback'}
          onPress={onPress}
        />
      )
  }
}

const renderTabBar = (props) => {
  const currentTabIndex = props.navigationState.index
  return (
    <TabBar 
      // contentContainerStyle={styles.tabBarContentContainerStyle}
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
  events,
  pastEvents,
  noDate,
  navigation,
  loading,
  navigateToEventDetails
}) => {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: translate('upcomingEventsLabel') },
    { key: 'second', title: translate('pastEventsLabel') },
    { key: 'third', title: translate('noDateEventsLabel') },
  ])

  return (
    <Container>
      <TabView
        navigationState={{ index, routes }}
        renderScene={({route}) => renderScene(
          route,
          events,
          pastEvents,
          noDate,
          loading,
          navigateToEventDetails
        )}
        renderTabBar={(props) => {
          return renderTabBar({...props, setIndex})
        }}
        // sceneContainerStyle={{ marginTop: 30 }}
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