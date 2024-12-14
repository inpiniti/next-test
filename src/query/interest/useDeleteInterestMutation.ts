import { fetchInterest } from '@/fetch/fetchInterest';
import { TInterest } from '@/interface/TInterest';
import { useMutation } from '@tanstack/react-query';

export const useDeleteInterestMutation = () =>
  useMutation({
    mutationFn: (interest: TInterest) => fetchInterest.delete(interest),
  });
