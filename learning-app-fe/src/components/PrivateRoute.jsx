
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const PrivateRoute = ({ element }) => {
  const token = Cookies.get('token')
    return token ? element : <Navigate to="/login" replace />
};

export default PrivateRoute;