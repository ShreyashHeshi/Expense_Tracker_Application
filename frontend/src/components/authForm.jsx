// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { api } from '../services/api'; // This service will handle API calls

// const AuthForm = ({ type }) => {
//     const [formData, setFormData] = useState({ email: '', password: '', fullname: '' });
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (type === 'login') {
//                 await api.login(formData);
//                 navigate('/');
//             } else {
//                 await api.register(formData);
//                 navigate('/login');
//             }
//         } catch (err) {
//             setError('Something went wrong!');
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
//             <h2 className="text-2xl mb-4">{type === 'login' ? 'Login' : 'Register'}</h2>
//             {error && <p className="text-red-500">{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 {type === 'register' && (
//                     <input
//                         type="text"
//                         name="fullname"
//                         placeholder="Full Name"
//                         className="w-full p-2 border border-gray-300 rounded mb-4"
//                         value={formData.fullname}
//                         onChange={handleChange}
//                     />
//                 )}
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     className="w-full p-2 border border-gray-300 rounded mb-4"
//                     value={formData.email}
//                     onChange={handleChange}
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     className="w-full p-2 border border-gray-300 rounded mb-4"
//                     value={formData.password}
//                     onChange={handleChange}
//                 />
//                 <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500">
//                     {type === 'login' ? 'Login' : 'Register'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AuthForm;
