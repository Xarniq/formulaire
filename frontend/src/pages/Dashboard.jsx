import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import isUserValid from '../components/UserValid';
import axios from 'axios';

function Dashboard() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    if (!isUserValid(user)) {
      navigate('/login');
    } else {
      // Fetch forms
      axios.get('/forms') // replace with your API endpoint if different
        .then(res => setForms(res.data))
        .catch(err => console.error(err));
    }
  }, [user, navigate]);


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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {forms.map(form => (
            <tr key={form._id}>
              <td>{form.name}</td> {/* replace with your form name property */}
              <td>
                <button onClick={() => deleteForm(form._id)}>Delete</button>
                <button onClick={() => updateForm(form._id)}>Update</button>
                <button onClick={() => printForm(form._id)}>Print</button>
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
