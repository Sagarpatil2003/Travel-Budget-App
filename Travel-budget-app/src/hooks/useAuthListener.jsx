import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { setUser } from '../store/authSlice';

export default function useAuthListener() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      dispatch(setUser(user ? { uid: user.uid, email: user.email } : null));
    });
    return unsub;
  }, [dispatch]);
}
