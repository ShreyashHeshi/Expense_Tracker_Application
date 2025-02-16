// import { useEffect, useState } from 'react';
// import { api } from '../services/api.js';
// import Navbar from '../components/navbar';
// import ExpenseList from '../components/ExpenseList';

// const HomePage = () => {
//     const [expenses, setExpenses] = useState([]);

//     useEffect(() => {
//         const fetchExpenses = async () => {
//             try {
//                 const data = await api.getExpenses();
//                 setExpenses(data);
//             } catch (err) {
//                 console.error(err);
//             }
//         };
//         fetchExpenses();
//     }, []);

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <Navbar />
//             <div className="container mx-auto p-8">
//                 <ExpenseList expenses={expenses} />
//             </div>
//         </div>
//     );
// };

// export default HomePage;
