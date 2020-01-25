import React from 'react';
import HomeScreen from '../screens/Home/Home';
import ProjectScreen from '../screens/Project/Project';
import CollabScreen from '../screens/Collab/Collab';
import SettingsScreen from '../screens/Settings/Settings';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';

const BottomNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                title: 'Home',
                tabBarIcon: () => (
                    <Icon name="home" size={30} color="#5d4d50" />
                )
            }
        },
        Projects: {
            screen: ProjectScreen,
            navigationOptions: {
                title: 'Projects',
                tabBarIcon: () => (
                    <Icon name="assignment" size={30} color="#5d4d50" />
                )
            }
        },
        Collabs: {
            screen: CollabScreen,
            navigationOptions: {
                title: 'Collabs',
                tabBarIcon: () => (
                    <Icon name="people" size={35} color="#5d4d50" />
                )
            }
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                title: 'Settings',
                tabBarIcon: () => (
                    <Icon name="settings" size={30} color="#5d4d50" />
                )
            }
        },
    },
    {
        initialRouteName: 'Home'
    },
);

export default BottomNavigator