import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import DeleteIcon from 'react-native-vector-icons/Feather';
import StarIcon from 'react-native-vector-icons/AntDesign';

export default function ListItem(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.starView} onPress={props.starPress}>
        <StarIcon name="star" size={24} color={props.isImportant} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[styles.itemTitle, { color: props.textColor }]}>
          {props.title}
        </Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={props.deletePress}>
        <DeleteIcon name="trash-2" color="#c13e45" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 14,
    marginTop: 15,
    paddingVertical: 4,
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  starView: {
    width: '15%',
    margin: 4,
    marginHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '70%',
    margin: 4,
    marginHorizontal: 0,
    padding: 5,
  },
  itemTitle: {
    fontSize: 18,
    // color: '#505050',
    fontFamily: 'RobotoMono-Bold',
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
    margin: 4,
    marginHorizontal: 0,
  },
});
