import React from 'react'
import Navbar from './navbar'
import CreateExpense from './CreateExpense'

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div>
                <h1>Expense</h1>
                <CreateExpense></CreateExpense>
            </div>


            
        </div>

    )
}

export default Home