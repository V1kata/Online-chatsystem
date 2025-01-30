import { useEffect } from 'react';
import { syncStorage } from '@/utils/synchStorage';
import { useUser } from '@/app/context/UserContext';

export const useAuth = () => {
  const { userData, setUserData } = useUser();

  useEffect(() => {
    async function setUp() {
      await syncStorage(userData, setUserData);
    }
    setUp()
  }, []);
};