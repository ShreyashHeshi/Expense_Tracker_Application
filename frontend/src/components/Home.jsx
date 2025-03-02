import React from 'react'
import Navbar from './navbar'
import CreateExpense from './CreateExpense'

const Home = () => {

    return (
        <div >
            <Navbar></Navbar>
            <h1 className="text-2xl font-bold">Expense tracking app</h1>
            <div className='max-w6xl mx-auto mt-6'>

                <h1 className="mt-6 text-lg font-semibold">Filter By:</h1>
               




            </div>
            <CreateExpense></CreateExpense>

        </div>


    )
}

export default Home