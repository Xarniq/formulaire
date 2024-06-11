import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import isUserValid from '../components/UserValid'

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserValid(user)) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {!!user && (
        <h1 className="text-xl">
          Hi {user.name}! Your email is {user.email}! Your id is : {user.id}
        </h1>
      )}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => {
          Cookies.remove('token');
          navigate('/login');
        }}
      >
        Log out
      </button>
    </div>
  );
}
