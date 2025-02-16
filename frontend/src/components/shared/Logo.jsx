import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/src/assets/expenselogo.jpg';

const Logo = () => {
    return (

        <Link to="/">

            <img src={logo} alt="Expense Logo" className="w-20 h-20 rounded-full object-cover"></img>
        </Link>

    )
}

export default Logo