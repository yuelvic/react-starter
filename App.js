import React, { useState, useEffect } from "react";
import { StyleSheet, Image, ImageBackground, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import 'react-native-gesture-handler';

export default function App() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(30);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const resp = await fetch("https://dummyjson.com/products");
    const data = await resp.json();
    setData(data.products);
    setLoading(false);
  };

  const fetchMoreData = async () => {
    setLoading(true);
    const resp = await fetch("https://dummyjson.com/products?skip=30");
    const more = await resp.json();
    setData([...data, ...more.products]);
    setOffset(offset + 30);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function ItemList({ item }) {
    return (
      <View style={styles.item}>
        <Image
          style={styles.image}
          source={{ uri: item.thumbnail }}
          resizeMode='contain'
          contentContainerStyle={{ padding: 20 }}
        />
        <View style={styles.wrapText}>
          <Text style={styles.fontSize}>{`${item.title}`}</Text>
        </View>
      </View>
    );
  }

  function DetailsScreen({ route }) {
    const { data } = route.params;
    return (
      <View style={[styles.container, { flexDirection: 'column' }]}>
        <Image
          style={{
            width: 400,
            height: 200
          }}
          source={{ uri: data.thumbnail }}
          resizeMode='contain'
          contentContainerStyle={{ padding: 20 }}
        />
        <Text style={styles.fontSize}>{data.title}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.fontSize}>Brand: </Text>
          <Text style={styles.fontSize}>{data.brand}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.fontSize}>Price: </Text>
          <Text style={styles.fontSize}>{data.price}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.fontSize}>Rating: </Text>
          <Text style={styles.fontSize}>{data.rating}</Text>
        </View>
      </View>
    );
  }

  function Item1Screen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Item 1 Content</Text>
      </View>
    );
  }

  function Item2Screen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Item 2 Content</Text>
      </View>
    );
  }

  function Item3Screen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Item 3 Content</Text>
      </View>
    );
  }

  function Item4Screen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Item 4 Content</Text>
      </View>
    );
  }

  function SearchScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Search Content</Text>
      </View>
    );
  }

  function FriendsScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Friends Content</Text>
      </View>
    );
  }

  function SettingsScreen({ navigation }) {
    if (loading) {
      return (
        <View style={[styles.container, { alignContent: 'center', alignItems: 'center' }]}>
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Details', { data: item })}>
                <ItemList item={item} />
              </TouchableOpacity>
            )
          }}
          contentContainerStyle={{ padding: 20 }}
          onEndReached={fetchMoreData} />
      </View>
    );
  }

  const HomeStack = createStackNavigator();

  function SettingsStackScreen() {
    return (
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="Settings" component={SettingsScreen} />
        <HomeStack.Screen name="Details" component={DetailsScreen} />
      </HomeStack.Navigator>
    );
  }

  function DrawerStackScreen() {
    return (
      <Drawer.Navigator
        initialRouteName="Item 1"
        drawerContent={(props) => {
          return (
            <View style={{ flex: 1 }}>
              <DrawerContentScrollView {...props}>
                <Image
                  source={require("./assets/images/avatar.png")}
                  style={{ width: 70, height: 70, borderRadius: 35, borderWidth: 2, margin: 10 }}
                />
                <DrawerItemList {...props} />
              </DrawerContentScrollView>
            </View>
          )
        }
        }
      >
        <Drawer.Screen
          name="Item 1"
          component={Item1Screen}
          options={{
            drawerIcon: () => (
              <Ionicons name="arrow-up-outline" />
            )
          }} />
        <Drawer.Screen
          name="Item 2"
          component={Item2Screen}
          options={{
            drawerIcon: () => (
              <Ionicons name="arrow-back-outline" />
            )
          }} />
        <Drawer.Screen
          name="Item 3"
          component={Item3Screen}
          options={{
            drawerIcon: () => (
              <Ionicons name="arrow-forward-outline" />
            )
          }} />
        <Drawer.Screen
          name="Item 4"
          component={Item4Screen}
          options={{
            drawerIcon: () => (
              <Ionicons name="arrow-down-outline" />
            )
          }} />
      </Drawer.Navigator>
    );
  }

  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={DrawerStackScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image
                style={{ width: 20, height: 20 }}
                source={require('./assets/images/home.png')}
                resizeMode='contain'
                contentContainerStyle={{ padding: 20 }}
              />
            )
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: () => (
              <Image
                style={{ width: 20, height: 20 }}
                source={require('./assets/images/search.png')}
                resizeMode='contain'
                contentContainerStyle={{ padding: 20 }}
              />
            )
          }}
        />
        <Tab.Screen
          name="Friends"
          component={FriendsScreen}
          options={{
            tabBarIcon: () => (
              <Image
                style={{ width: 20, height: 20 }}
                source={require('./assets/images/friends.png')}
                resizeMode='contain'
                contentContainerStyle={{ padding: 20 }}
              />
            )
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStackScreen}
          options={{
            tabBarIcon: () => (
              <Image
                style={{ width: 20, height: 20 }}
                source={require('./assets/images/cog.png')}
                resizeMode='contain'
                contentContainerStyle={{ padding: 20 }}
              />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  fontSize: {
    fontSize: 18
  },
  image: {
    width: 100,
    height: 100
  },
  wrapText: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center'
  },
  item: {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: .3,
    shadowRadius: 30,
    padding: 10
  },
  container: {
    flex: 1
  }
});