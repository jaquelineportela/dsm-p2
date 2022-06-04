import React, { useState } from 'react';

import { SafeAreaView, Text, StyleSheet, View, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import api from './api';

const App = () => {
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [defaultRating, setDefaultRating] = useState(2);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

    const filter = (fieldText) => {
      if (fieldText) {
        api.get(fieldText).then((Response) => {
          for (var i = 0; i < Response.data.hits.length; i++) {
            if (Response.data.hits) {
              setFiltered(Response.data.hits);
            }
          }
          setSearch(fieldText);
        });
      }
    };

    const RatingBar = () => {
      return (
        <View>
          {maxRating.map((item, key) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={item}
                onPress={() => setDefaultRating(item)}>
                <Image
                  style={styles.starImageStyle}
                  source={
                    item <= defaultRating
                      ? require('./assets/estrela.png')
                      : require('./assets/estrela.png')
                  }
                />
              </TouchableOpacity>
            );
          })}
        </View>
      );
    };

    const ViewItems = ({ item }) => {
      return (
        <Text style={styles.items}>
          {'Author: '}
          {item.author + '\n'}
          {'Title: '}
          {item.title + '\n'}
          {'Url: '}
          {item.url + '\n'}
          {'Rate: '}
          {item.rate}
          <RatingBar />
          <Text>
            {defaultRating} / {Math.max.apply(null, maxRating)}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => alert(defaultRating)}>
          </TouchableOpacity>
        </Text>
      );
    };

    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.text}>Books</Text>
          <TextInput
            style={styles.input}
            onChangeText={(fieldText) => setSearch(fieldText)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search"
          />
          <Button
            onPress={() => filter(search)}
            title="Search"
            color="white"
          />
          <FlatList
            data={filtered}
            renderItem={ViewItems}
          />
        </View>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: "#ffffff"
  },
  text: {
    textAlign: "center",
    fontSize: '150%',
    marginBottom: '4%'
  },
  items: {
    backgroundColor: '#cea19b',
    padding: 8,
    marginTop: 8,
    color: 'black',
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
  },

});

export default App;