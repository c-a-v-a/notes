import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Image } from 'react-native';
import Notes from './components/Notes';
import AddNote from './components/AddNote';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>

    <DrawerItemList {...props} />

    <DrawerItem
      label="test"
      icon={() => <Image />}
      onPress={() => console.log("test")}
    />

    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={ (props) => <CustomDrawerContent { ...props } />}>
        <Drawer.Screen name='Notes' component={ Notes }/>
        <Drawer.Screen name='Add note' component={ AddNote }/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

