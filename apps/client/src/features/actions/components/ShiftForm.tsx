import { useState } from 'react';

export default function ShiftForm() {
  const [amount, setAmount] = useState('');
  const [fee, setFee] = useState('');
  const [fromAccount, setFromAccount] = useState('Livin Mandiri');
  const [toAccount, setToAccount] = useState('Gopay');

  const handleSubmit = () => {
    console.log({ amount, fee, fromAccount, toAccount });
  };

  return (
    <div className="flex flex-col gap-4 px-4 pb-4">
      {/* Amount + Fee */}
      <div className="border-2 border-acid-yellow">
        <div className="bg-red px-4 pt-3 pb-3">
          <span className="font-barlow font-bold text-white text-sm">Amount</span>
        </div>
        <div className="bg-red px-4 pb-2">
          <div className="flex items-center bg-white border-3 border-black">
            <span className="font-barlow font-bold text-charcoal-gray px-3 py-2 border-r-2 border-charcoal-gray">
              IDR
            </span>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="flex-1 bg-transparent text-charcoal-gray font-barlow font-bold text-lg px-3 py-2 outline-none border-none"
            />
          </div>
        </div>
        {/* Fee (Optional) — inside same card */}
        <div className="bg-red px-4 pb-4">
          <span className="font-barlow font-bold text-white text-sm">Fee (Optional)</span>
          <div className="flex items-center bg-white border-3 border-black mt-1">
            <span className="font-barlow font-bold text-charcoal-gray px-3 py-2 border-r-2 border-charcoal-gray">
              IDR
            </span>
            <input
              type="text"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              placeholder="0"
              className="flex-1 bg-transparent text-charcoal-gray font-barlow font-bold text-lg px-3 py-2 outline-none border-none"
            />
          </div>
        </div>
      </div>

      {/* From & To — two columns */}
      <div className="grid grid-cols-2 gap-3">
        {/* From */}
        <div className="border-2 border-acid-yellow">
          <div className="bg-dark-maroon px-4 pt-3 pb-3">
            <span className="font-barlow font-bold text-white text-sm">From</span>
          </div>
          <div className="bg-dark-maroon px-4 pb-4">
            <select
              value={fromAccount}
              onChange={(e) => setFromAccount(e.target.value)}
              className="w-full bg-white border-3 border-charcoal-gray text-charcoal-gray font-barlow font-bold text-sm px-3 py-1.5 outline-none cursor-pointer"
            >
              <option value="Livin Mandiri">Livin Mandiri</option>
              <option value="Cash">Cash</option>
              <option value="Gopay">Gopay</option>
              <option value="OVO">OVO</option>
            </select>
          </div>
        </div>

        {/* To */}
        <div className="border-2 border-acid-yellow">
          <div className="bg-dark-maroon px-4 pt-3 pb-3">
            <span className="font-barlow font-bold text-white text-sm">To</span>
          </div>
          <div className="bg-dark-maroon px-4 pb-4">
            <select
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              className="w-full bg-white border-3 border-charcoal-gray text-charcoal-gray font-barlow font-bold text-sm px-3 py-1.5 outline-none cursor-pointer"
            >
              <option value="Gopay">Gopay</option>
              <option value="Livin Mandiri">Livin Mandiri</option>
              <option value="Cash">Cash</option>
              <option value="OVO">OVO</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-red text-white font-bebas text-2xl py-3 border-5 border-white cursor-pointer hover:text-red hover:bg-white hover:border-red"
      >
        SHIFT
      </button>
    </div>
  );
}
