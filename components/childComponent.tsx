// ChildComponent.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

const ChildComponent = ({ items }) => {
  return (
    <ThemedView>
      {items.map((item, index) => (
        <Text key={index} style={styles.itemText}>
          {item}
        </Text>
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  itemText: {
    fontSize: 18,
    padding: 10,
  },
});

export default ChildComponent;
