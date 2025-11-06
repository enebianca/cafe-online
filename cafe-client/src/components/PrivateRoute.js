import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const loggedIn = useSelector((state) => state.global.loggedIn);
  return loggedIn ? children : <Navigate to="/login" />;
}
