import React, { useState } from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import RecentTransactionItem from '../components/RecentTransactionItem';
import { toast } from 'sonner';

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  
  useState(() => {
    getAllTransactions().then(transactions => setTransactions(transactions));
  }, [])

  async function getAllTransactions() {
    const url = process.env.REACT_APP_API_URL + "/transactions";
    const response = await fetch(url);
    return await response.json();
  }

  const onDelete = async (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/delete-transactions";
    fetch(url, {
      method: "DELETE",
    }).then((res) => {
      if(res.ok) {
        toast.success("Transaction history deleted")
      }else{
        toast.error("Failed to delete transaction history")
      }
    }).finally(setTransactions([]));
  }

  return (
    <div className='w-full flex justify-center px-5 md:px-0'>
      <div className='mt-28 w-full md:w-[500px] h-max space-y-5'>
        <div className='w-full space-y-2'>
          <Link to="/" className='flex items-center'>
            <BiLeftArrowAlt className='w-5 h-5' />
            <span className='text-sm font-semibold'>
              Go Back
            </span>
          </Link>
          <div className='w-full flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Transaction History</h1>
            <button className='text-xs font-bold px-3 py-2 rounded-lg bg-white text-zinc-600 border border-zinc-300/30' onClick={onDelete}>
              Clear History
            </button>
          </div>
        </div>
        {transactions.length === 0 && <h1 className='font-semibold text-zinc-600'>No transactions to show</h1>}
        <div className='space-y-2'>
          {transactions.map((transaction, index) => (
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
  )
}

export default TransactionsPage