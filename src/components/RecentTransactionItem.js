function RecentTransactionItem({amount, label, note, type}) {
  return (
    <div className='w-full rounded-xl h-max bg-white flex items-center justify-between border border-zinc-300/30 px-5 py-3'> 
        <div className='flex flex-col flex-1'>
        <h1 className='font-semibold'>{label}</h1>
        <span className='text-sm text-zinc-600 line-clamp-1'>
            {note}
        </span>
        </div>
        <h1 className={`font-bold ${type === 'income' ? "text-green-500" : "text-red-500"}`}>
            {type === "income" ? "+" : "-"}
            ${amount}
        </h1>
    </div>
  )
}

export default RecentTransactionItem