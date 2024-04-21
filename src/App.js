
import './App.css';
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { BiSolidMinusCircle, BiSolidPlusCircle } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RecentTransactionItem from './components/RecentTransactionItem';

function HomePage() {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [totalbalance, setTotalBalance] = useState(0);
  const [totalincome, setTotalIncome] = useState(0);
  const [totalexpense, setTotalExpense] = useState(0);

  useEffect(() => {
    getRecentTransactions().then(transactions => {
      setRecentTransactions(transactions);
    })
    getAllTransactions().then(transactions => {
      calculateTotalValues(transactions)
    })
  }, [])

  async function getRecentTransactions () {
    const url = process.env.REACT_APP_API_URL + "/recent-transactions";
    const response = await fetch(url);
    return await response.json();
  }

  async function getAllTransactions() {
    const url = process.env.REACT_APP_API_URL + "/transactions";
    const response = await fetch(url);
    return await response.json();
  }

  function calculateTotalValues(transactions) {
    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        income += transaction.amount;
      } else if (transaction.type === 'expense') {
        expense += transaction.amount;
      }
    });

    const balance = income - expense;
    setTotalIncome(income);
    setTotalExpense(expense);
    setTotalBalance(balance);
  }

  return (
    <main className='w-full h-screen flex items-center justify-center px-5 md:px-0'>
      <div className='space-y-3 flex flex-col items-center h-max w-full md:w-[400px]'>
        <div className='w-full  h-[230px] rounded-3xl bg-gradient-to-r from-violet-500 to-purple-500 text-white flex flex-col pt-10 pb-5 px-5 gap-y-1 justify-between'>
          <div className=''>
            <h1 className='text-center font-medium'>Total Balance</h1>
            <h1 className='text-5xl md:text-4xl text-center font-extrabold'>$
              {totalbalance < 0 && "-"}
              {totalbalance}
            </h1>
          </div>
          <div className='w-full flex justify-between'>
            <div className='flex gap-1.5 h-full items-center'>
              <div className='rounded-full h-10 aspect-square bg-white/20 flex items-center justify-center'>
                <FaArrowDown className='w-5 h-5 text-green-400' strokeWidth={3} />
              </div>
              <div className='flex h-full justify-around flex-col gap-1'>
                <span className='text-sm leading-none font-light'>
                  Income
                </span>
                <span className='text-xl font-semibold leading-none'>
                  ${totalincome}
                </span>
              </div>
            </div>
            <div className='flex gap-1.5 h-full items-center'>
              <div className='rounded-full h-10 aspect-square bg-white/20 flex items-center justify-center'>
                <FaArrowUp className='w-5 h-5 text-red-500' strokeWidth={3} />
              </div>
              <div className='flex h-full justify-around flex-col gap-1'>
                <span className='text-sm leading-none font-light'>
                  Expense
                </span>
                <span className='text-xl font-semibold leading-none'>
                  ${totalexpense}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex gap-x-2 md:gap-x-3 text-zinc-700'>
          <Link to="/add-income" className='w-full rounded-xl h-16 bg-white flex items-center justify-center border border-zinc-300/30 cursor-pointer'>
            <div className='flex items-center gap-2'>
             <BiSolidPlusCircle className='h-4 w-4' />
             <span className='font-medium'>Add Income</span>
            </div>
          </Link>
          <Link to={"/add-expense"} className='w-full rounded-xl bg-white flex items-center justify-center border border-zinc-300/30 cursor-pointer'>
            <div className='flex items-center gap-2'>
             <BiSolidMinusCircle className='h-4 w-4' />
             <span className='font-medium'>Add Expense</span>
            </div>
          </Link>
        </div>
        <div className='w-full space-y-3'>
          <div className='w-full justify-between flex items-center'>
            <h1 className='font-semibold text-lg'>Recent Transactions</h1>
            <Link to="/transactions" className='text-xs font-bold px-3 py-2 rounded-lg bg-white text-zinc-600 border border-zinc-300/30'>
              View all
            </Link>
          </div>
          <div className='space-y-2'>
            {recentTransactions.length === 0 && <h1 className='font-semibold text-zinc-600'>No transactions to show</h1>}
            {recentTransactions.length > 0 && recentTransactions.map((transaction, index) => (
              <RecentTransactionItem
                key={index}
                amount={transaction.amount}
                label={transaction.label}
                note={transaction.note}
                type={transaction.type}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
