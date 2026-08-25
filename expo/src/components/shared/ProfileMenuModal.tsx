import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemeTokens } from '@/constants/tokens';
import { logoutFirebase } from '@/services/authService';

interface ProfileMenuModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ProfileMenuModal: React.FC<ProfileMenuModalProps> = ({
  visible,
  onClose,
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    onClose();
    try {
      await logoutFirebase();
      router.replace('/(auth)/login' as any);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.menuContainer}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleLogout}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="log-out-outline"
                  size={20}
                  color={ThemeTokens.colors.error}
                />
                <Text style={styles.menuItemText}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 56,
    paddingRight: ThemeTokens.spacing.md,
  },
  menuContainer: {
    backgroundColor: ThemeTokens.colors.surfaceContainerLowest,
    borderRadius: ThemeTokens.borderRadius.md,
    paddingVertical: ThemeTokens.spacing.xs,
    paddingHorizontal: ThemeTokens.spacing.sm,
    minWidth: 160,
    borderWidth: 1,
    borderColor: `${ThemeTokens.colors.outlineVariant}30`,
    ...ThemeTokens.shadows.soft,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ThemeTokens.spacing.sm + 2,
    paddingHorizontal: ThemeTokens.spacing.sm,
    gap: ThemeTokens.spacing.sm,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '600',
    color: ThemeTokens.colors.error,
  },
});
