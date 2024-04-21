import { useState } from "react"
import { BiLeftArrowAlt } from "react-icons/bi";
import { CgArrowLeft } from "react-icons/cg";
import { FiLoader } from "react-icons/fi";
import { Link } from "react-router-dom"
import { toast } from "sonner";

function AddIncomePage() {
  const [amount, setAmount] = useState(0);
  const [label, setLabel] = useState("");
  const [note, setNote] = useState("");
  const [datetime, setDateTime] = useState("");
  const [loading, setLoading] = useState(false);


  const addNewTransaction = async (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify({amount,label, note, datetime, type: "income"})
    }).then(res => {
      if(res.ok) {
        setAmount(0);
        setLabel("");
        setNote("");
        setDateTime("");
        toast.success("Transaction added!")
      } else {
        toast.error("Please fill all the fields") 
      }
    }).finally(setLoading(false))
  }

  return (
    <main className="w-full h-screen flex items-center justify-center px-5 md:px-0">
      <div className="flex flex-col gap-y-5 items-center w-full md:w-[350px]">
        <h1 className="text-2xl font-bold">Add Income</h1>
        <form className="w-full space-y-5" onSubmit={addNewTransaction}>
          <div className="space-y-1">
            <h1 className="font-medium">
              Amount Received
            </h1>
            <div className="bg-white w-full rounded px-3  flex gap-1 items-center">
              <span className={`font-medium`}>
                $
              </span>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="800" className="rounded py-3  w-full font-medium outline-none" />
            </div>
          </div>

          <div className="w-full space-y-1">
            <h1 className="font-medium">Label</h1>
            <input value={label} onChange={(e) => setLabel(e.target.value)} type="text" placeholder="RTX 4070" className="w-full rounded p-3 outline-none" />
          </div>

          <div className="w-full space-y-1">
            <h1 className="font-medium">Short Note</h1>
           <input value={note} onChange={(e) => setNote(e.target.value)} type="text" placeholder="This purchase was related to..." className="w-full rounded p-3 outline-none" />
          </div>
          
          <div className="w-full space-y-1">
            <h1 className="font-medium">Time</h1>
            <input value={datetime} onChange={(e) => setDateTime(e.target.value)} type="datetime-local" placeholder="This purchase was related to..." className="w-full rounded p-3 outline-none" />
          </div>
          <div className="space-y-2">
            <button type="submit" className={`bg-black p-3 font-bold w-full rounded text-white flex items-center justify-center ${loading || amount === 0 || amount === undefined || amount < 0 ? "cursor-not-allowed bg-gray-500" : ""}`} disabled={loading || amount === 0 || amount === undefined || amount < 0}>
              {loading && <FiLoader className="h-5 w-5 animate-spin mr-2" />}
              Add Transaction
            </button>
            <Link to="/" className="w-full rounded h-max bg-white flex items-center justify-center border border-zinc-300/30 px-5 py-3 font-semibold">
             <BiLeftArrowAlt className='w-5 h-5' />
              Go Back
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}

export default AddIncomePage