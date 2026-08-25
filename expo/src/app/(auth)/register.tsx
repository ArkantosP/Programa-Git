import { EditableAvatar } from '@/components/auth/EditableAvatar';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Divider } from '@/components/ui/Divider';
import { GoogleIcon } from '@/components/ui/GoogleIcon';
import { TextField } from '@/components/ui/TextField';
import { ThemeTokens } from '@/constants/tokens';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { registerWithEmailPassword } from '@/services/authService';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { signInWithGoogle, loading: googleLoading } = useGoogleAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    }

    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }

    if (!address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }

    if (!city.trim()) {
      newErrors.city = 'La ciudad es requerida';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!acceptedTerms) {
      newErrors.acceptedTerms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await registerWithEmailPassword(email.trim(), password, {
        fullName: fullName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        photoURL: profileImage,
      });

      setLoading(false);
      Alert.alert(
        '¡Registro Exitoso!',
        'Tu cuenta y perfil han sido creados correctamente.',
        [
          {
            text: 'Ir al Inicio',
            onPress: () => router.replace('/dashboard' as any),
          },
        ]
      );
    } catch (error: any) {
      setLoading(false);
      let errorMessage = 'No se pudo crear la cuenta. Inténtalo de nuevo.';
      if (error?.code === 'auth/email-already-in-use') {
        errorMessage = 'El correo electrónico ya está registrado. Intenta iniciar sesión.';
      } else if (error?.code === 'auth/invalid-email') {
        errorMessage = 'El formato del correo electrónico no es válido.';
      } else if (error?.code === 'auth/weak-password') {
        errorMessage = 'La contraseña es demasiado débil.';
      }
      Alert.alert('Error de registro', errorMessage);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithGoogle();
      router.replace('/dashboard' as any);
    } catch (error: any) {
      Alert.alert(
        'Google Register',
        error.message || 'No se pudo completar el registro con Google.'
      );
    }
  };

  const handleLoginNavigation = () => {
    router.push('/(auth)/login' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Foto de Perfil Editable */}
            <EditableAvatar
              imageUri={profileImage}
              onSelectImage={(uri) => setProfileImage(uri)}
            />

            {/* Encabezado */}
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>Crear nueva cuenta</Text>
              <Text style={styles.subtitle}>Únete a nuestra comunidad dulce</Text>
            </View>

            {/* Formulario */}
            <View style={styles.formContainer}>
              <TextField
                label="Nombre completo"
                placeholder="Tu nombre"
                iconName="person-outline"
                value={fullName}
                onChangeText={(text) => {
                  setFullName(text);
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                }}
                error={errors.fullName}
              />

              <TextField
                label="Correo Electrónico"
                placeholder="ejemplo@correo.com"
                iconName="mail-outline"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
              />

              <TextField
                label="Número de Teléfono"
                placeholder="+57 300 000 0000"
                iconName="phone-iphone"
                value={phone}
                onChangeText={(text) => {
                  setPhone(text);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                }}
                keyboardType="phone-pad"
                error={errors.phone}
              />

              <TextField
                label="Dirección de entrega"
                placeholder="Calle y número"
                iconName="location-on"
                value={address}
                onChangeText={(text) => {
                  setAddress(text);
                  if (errors.address) setErrors((prev) => ({ ...prev, address: '' }));
                }}
                error={errors.address}
              />

              <TextField
                label="Ciudad"
                placeholder="Ciudad"
                iconName="map"
                value={city}
                onChangeText={(text) => {
                  setCity(text);
                  if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
                }}
                error={errors.city}
              />

              <TextField
                label="Contraseña"
                placeholder="••••••••"
                iconName="lock-outline"
                isPassword={true}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                }}
                error={errors.password}
              />

              <TextField
                label="Confirmar contraseña"
                placeholder="••••••••"
                iconName="lock-reset"
                isPassword={true}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                }}
                error={errors.confirmPassword}
              />

              {/* Checkbox Términos y Condiciones */}
              <Checkbox
                checked={acceptedTerms}
                onPress={() => {
                  setAcceptedTerms(!acceptedTerms);
                  if (errors.acceptedTerms) setErrors((prev) => ({ ...prev, acceptedTerms: '' }));
                }}
                error={errors.acceptedTerms}
              >
                <Text style={styles.termsLabel}>
                  Acepto los{' '}
                  <Text style={styles.termsLink}>Términos y condiciones</Text> y la
                  política de privacidad de Michi Mochi.
                </Text>
              </Checkbox>

              {/* Botón Submit */}
              <Button
                title="Crear cuenta"
                variant="primary"
                onPress={handleRegister}
                loading={loading}
                style={styles.submitButton}
              />
            </View>

            {/* Divisor Social */}
            <Divider label="O regístrate con" />

            {/* Social Google Registration */}
            <View style={styles.socialContainer}>
              <Button
                title="Continuar con Google"
                variant="google"
                onPress={handleGoogleRegister}
                loading={googleLoading}
                icon={<GoogleIcon size={22} />}
              />
            </View>

            {/* Footer Navegación a Login */}
            <View style={styles.footerLinkContainer}>
              <Text style={styles.footerText}>¿Ya tienes una cuenta?</Text>
              <TouchableOpacity activeOpacity={0.8} onPress={handleLoginNavigation}>
                <Text style={styles.loginLink}>Iniciar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ThemeTokens.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  container: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: ThemeTokens.colors.primary,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: ThemeTokens.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  termsLabel: {
    fontSize: 13,
    color: ThemeTokens.colors.onSurfaceVariant,
    lineHeight: 18,
  },
  termsLink: {
    fontWeight: '700',
    color: ThemeTokens.colors.primary,
    textDecorationLine: 'underline',
  },
  submitButton: {
    marginTop: 16,
  },
  socialContainer: {
    width: '100%',
  },
  footerLinkContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 15,
    color: ThemeTokens.colors.onSurfaceVariant,
    marginBottom: 6,
  },
  loginLink: {
    fontSize: 16,
    fontWeight: '700',
    color: ThemeTokens.colors.primary,
    textDecorationLine: 'underline',
  },
});
