import { useState } from 'react';

// Mock categories — replace with real data
const SPEND_CATEGORIES = [
  'BILL', 'COFFEE', 'SELF IMPROVEMENT',
  'HOBBIES', 'FOOD & DRINK', 'INTERNET',
];

export default function SpendForm() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [payment, setPayment] = useState('Cash');
  const [notes, setNotes] = useState('');

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = () => {
    console.log({ amount, description, selectedCategories, date, payment, notes });
  };

  const formatDateDisplay = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="flex flex-col gap-4 px-4 pb-4">
      {/* Amount */}
      <div className="border-2 border-acid-yellow">
        <div className="bg-red px-4 pt-3 pb-3">
          <span className="font-barlow font-bold text-white text-sm">Amount</span>
        </div>
        <div className="bg-red px-4 pb-4">
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
      </div>

      {/* Description */}
      <div className="border-2 border-acid-yellow">
        <div className="bg-dark-maroon px-4 pt-3 pb-3">
          <span className="font-barlow font-bold text-white text-sm">Description</span>
        </div>
        <div className="bg-dark-maroon px-4 pb-4">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Claude Subs"
            className="w-full bg-white border-3 border-black text-charcoal-gray font-barlow font-bold px-3 py-2 outline-none"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="border-2 border-acid-yellow">
        <div className="bg-dark-maroon px-4 pt-3 pb-3">
          <span className="font-barlow font-bold text-white text-sm">Categories</span>
        </div>
        <div className="bg-dark-maroon px-4 pb-4">
          <div className="flex flex-wrap gap-2">
            {SPEND_CATEGORIES.map((cat) => {
              const isSelected = selectedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1 font-bebas text-lg cursor-pointer transition-colors duration-150 ${
                    isSelected
                      ? 'bg-white text-red border-red border-3'
                      : 'bg-red text-white border-white border-3 hover:text-red hover:bg-white/80 hover:border-red'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Date & Payment — two columns */}
      <div className="grid grid-cols-2 gap-3">
        {/* Date */}
        <div className="border-2 border-acid-yellow">
          <div className="bg-dark-maroon px-4 pt-3 pb-3">
            <span className="font-barlow font-bold text-white text-sm">Date</span>
          </div>
          <div className="bg-dark-maroon px-4 pb-4">
            <div className="bg-white border-3 border-charcoal-gray px-3 py-1.5 relative">
              <span className="font-barlow text-charcoal-gray text-sm font-bold">
                {formatDateDisplay(date)}
              </span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="border-2 border-acid-yellow">
          <div className="bg-dark-maroon px-4 pt-3 pb-3">
            <span className="font-barlow font-bold text-white text-sm">Payment</span>
          </div>
          <div className="bg-dark-maroon px-4 pb-4">
            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="w-full bg-white border-3 border-charcoal-gray text-charcoal-gray font-barlow font-bold text-sm px-3 py-1.5 outline-none cursor-pointer"
            >
              <option value="Cash">Cash</option>
              <option value="Livin Mandiri">Livin Mandiri</option>
              <option value="Gopay">Gopay</option>
              <option value="OVO">OVO</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notes (Optional) */}
      <div className="border-2 border-acid-yellow">
        <div className="bg-dark-maroon px-4 pt-3 pb-3">
          <span className="font-barlow font-bold text-white text-sm">Notes (Optional)</span>
        </div>
        <div className="bg-dark-maroon px-4 pb-4">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Sedekah ke tel aviv"
            rows={3}
            className="w-full bg-white border-2 border-charcoal-gray text-charcoal-gray font-barlow px-3 py-2 outline-none resize-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-red text-white font-bebas text-2xl py-3 border-5 border-white cursor-pointer hover:text-red hover:bg-white hover:border-red"
      >
        ADD SPEND
      </button>
    </div>
  );
}
