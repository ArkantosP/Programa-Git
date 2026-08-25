import React from 'react';
import { TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ThemeTokens } from '@/constants/tokens';

const DEFAULT_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBV2VKYJkcVr1adSt0cg5vLDhEEEWMtdtl6rX8vhSKLHBXxLPf2ibX16gwCacI0Y-aZxUJAF5bmysrQRFtadB1DygXcjLP8-e3KsO3RZ4zkRSa499DqmrBaUNW0IhQkMutrf4WpEOJyILtKOOd5RGtaXM03cOY2Y4UqBAnLisk8eSLd99d7i4lCcp4CQHC8Yst34LY0LgBQcOQbi_slnshtpD3IRPTD3awhVIVT3XXyIOxlbqaOQ_W44OsOko4cBC7zwxF9VEPAfbk';

interface EditableAvatarProps {
  imageUri?: string | null;
  onSelectImage: (uri: string) => void;
}

export const EditableAvatar: React.FC<EditableAvatarProps> = ({
  imageUri,
  onSelectImage,
}) => {
  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permiso denegado',
        'Se requiere acceso a la galería para cambiar la foto de perfil.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      onSelectImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handlePickImage}
        style={styles.avatarButton}
      >
        <Image
          source={{ uri: imageUri || DEFAULT_AVATAR_URL }}
          style={styles.avatarImage}
          contentFit="cover"
        />

        <View style={styles.cameraBadge}>
          <MaterialIcons name="add-a-photo" size={16} color="#ffffff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatarButton: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 4,
    borderColor: '#ffffff',
    position: 'relative',
    ...ThemeTokens.shadows.soft,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: ThemeTokens.colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
