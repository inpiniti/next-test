import useSupabase from '@/hooks/useSupabase';
import { useAuthStore } from '@/stores/useAuthStore';

export const useAuth = () => {
  const supabase = useSupabase();

  const login = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    });
    if (error) {
      console.error('error', error, '카카오 로그인에 실패하였습니다.');
    } else {
      useAuthStore
        .getState()
        .setUser((await supabase.auth.getUser()).data.user);
    }
  };
  return { login };
};
