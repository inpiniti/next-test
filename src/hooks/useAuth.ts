import useSupabase from '@/hooks/useSupabase';
import { useAuthStore } from '@/stores/useAuthStore';

export const useAuth = () => {
  const supabase = useSupabase();

  const login = async () => {
    const redirectTo =
      process.env.NODE_ENV === 'production'
        ? 'https://stock.potatomap.com'
        : 'http://localhost:3000';

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo,
      },
    });
    if (error) {
      console.error('error', error, '카카오 로그인에 실패하였습니다.');
    } else {
      useAuthStore
        .getState()
        .setUser((await supabase.auth.getUser()).data.user);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('로그아웃 실패', error);
    } else {
      useAuthStore.getState().setUser(null);
    }
  };

  return { login, logout };
};
