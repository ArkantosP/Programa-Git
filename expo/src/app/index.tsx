import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';

export default function IndexPage() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Redirect href={'/dashboard' as any} />;
  }

  return <Redirect href={'/(auth)/login' as any} />;
}
