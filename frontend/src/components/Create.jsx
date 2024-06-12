import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import isUserValid from '../components/UserValid';

function Create() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { id } = useParams(); // Get the ID from the URL parameters
    const [data, setData] = useState({
        name: '',
        numberOfContractants: 0,
        nameOfContractants: []
    });

    useEffect(() => {
        if (!isUserValid(user)) {
            navigate('/login');
        } else if (id) {
            // Fetch contract data if an ID is present
            axios.get(`/forms/${id}`) // Replace with your API endpoint
                .then(res => {
                    const { name, numberOfContractants, nameOfContractants } = res.data;
                    setData({ name, numberOfContractants, nameOfContractants });
                })
                .catch(err => {
                    console.error(err);
                    toast.error('Failed to fetch contract data');
                });
        }
    }, [user, navigate, id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, numberOfContractants, nameOfContractants } = data;

        try {
            if (id) {
                // Update form if an ID is present
                const response = await axios.put(`/registerform/${id}`, {
                    name,
                    numberOfContractants,
                    nameOfContractants,
                });

                if (response.data.error) {
                    toast.error(response.data.error);
                } else {
                    toast.success('Form updated successfully');
                    navigate('/dashboard');
                }
            } else {
                // Create form if no ID is present
                const response = await axios.post('/registerform', {
                    name,
                    numberOfContractants,
                    nameOfContractants,
                });

                if (response.data.error) {
                    toast.error(response.data.error);
                } else {
                    setData({
                        name: '',
                        numberOfContractants: 0,
                        nameOfContractants: []
                    });
                    toast.success('Form registered successfully');
                    navigate('/dashboard');
                }
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again.');
        }
    };

    const handleContractantChange = (index, event) => {
        const newContractants = [...data.nameOfContractants];
        newContractants[index] = event.target.value;
        setData({ ...data, nameOfContractants: newContractants });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">{id ? 'Update Form' : 'Create Form'}</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-gray-700">
                        Name:
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">
                        Number of Contractants:
                        <input
                            type="number"
                            value={data.numberOfContractants}
                            onChange={(e) => setData({ ...data, numberOfContractants: e.target.value })}
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </label>
                </div>
                {Array.from({ length: data.numberOfContractants }, (_, index) => (
                    <div className="mb-4" key={index}>
                        <label className="block text-gray-700">
                            Name of Contractant {index + 1}:
                            <input
                                type="text"
                                value={data.nameOfContractants[index] || ''}
                                onChange={(e) => handleContractantChange(index, e)}
                                className="mt-1 p-2 w-full border rounded"
                            />
                        </label>
                    </div>
                ))}
                <div className="flex justify-center">
                    <input
                        type="submit"
                        value={id ? 'Update' : 'Submit'}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
                    />
                </div>
            </form>
        </div>
    );
}

export default Create;
