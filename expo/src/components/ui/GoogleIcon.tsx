import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export const GoogleIcon: React.FC<{ size?: number }> = ({ size = 20 }) => {
  return (
    <View style={styles.container}>
      <FontAwesome name="google" size={size} color="#4285F4" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
