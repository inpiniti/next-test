import { fetchInterest } from '@/fetch/fetchInterest';
import { TInterest } from '@/interface/TInterest';
import { useMutation } from '@tanstack/react-query';

export const usePostInterestMutation = () =>
  useMutation({
    mutationFn: (interest: TInterest) => fetchInterest.post(interest),
  });
