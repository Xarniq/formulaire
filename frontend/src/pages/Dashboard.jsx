import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import isUserValid from '../components/UserValid';
import axios from 'axios';
import toast from 'react-hot-toast';

function Dashboard() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    if (!isUserValid(user)) {
      navigate('/login');
    } else {
      axios.get('/forms') // replace with your API endpoint if different
        .then(res => setForms(res.data))
        .catch(err => console.error(err));
    }
  }, [user, navigate]);

  const confirmDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      axios.delete(`/deleteform/${id}`) // replace with your API endpoint if different
        .then(() => {
          setForms(forms.filter(form => form._id !== id));
          toast.success('Form deleted successfully');
        })
        .catch(err => {
          console.error(err);
          toast.error('An error occurred. Please try again.');
        });
    }
  };

  const updateForm = (id) => {
    navigate(`/createform/${id}`); // adjust according to your route setup
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to the dashboard</h1>
      {!!user && (
        <div>
          <h1 className="text-xl">
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => navigate('/createform')}
            >
              Create Form
            </button>
          </h1>
        </div>
      )}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Contract Name</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {forms.map(form => (
            <tr key={form._id}>
              <td className="border px-4 py-2">{form._id}</td>
              <td className="border px-4 py-2 justify-center">{form.name}</td>
              <td className="border px-4 py-2">
                <button 
                  onClick={() => updateForm(form._id)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  Modify
                </button>
                <button 
                  onClick={() => confirmDelete(form._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="mt-4 px-4 py-2 bg-purple-500 text-white rounded"
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

export default Dashboard;
