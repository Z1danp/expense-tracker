import { useState } from 'react';

const TIME_FILTERS = ['TODAY', 'THIS WEEK', 'THIS MONTH'];

export default function QuickFilter() {
  const [activeFilter, setActiveFilter] = useState('THIS WEEK');
  const [category, setCategory] = useState('ALL');

  return (
    <div className="flex flex-col gap-4 px-4">
      {/* Quick Filter */}
      <div className="border-2 border-acid-yellow">
        <div className="bg-dark-maroon px-4 pt-3 pb-4">
          <span className="font-barlow font-bold text-white text-sm mb-3 block">Quick Filter</span>
          <div className="flex flex-wrap gap-2">
            {TIME_FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1 font-bebas text-lg cursor-pointer transition-colors duration-150 ${
                    isActive
                      ? 'bg-white text-red border-red border-3'
                      : 'bg-red text-white border-white border-3 hover:text-red hover:bg-white/80 hover:border-red'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* By Categories */}
      <div className="border-2 border-acid-yellow">
        <div className="bg-dark-maroon px-4 py-3 flex items-center justify-between">
          <span className="font-barlow font-bold text-white text-sm">By Categories</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white border-3 border-red text-black font-barlow font-bold uppercase text-sm px-3 py-1 outline-none cursor-pointer"
          >
            <option value="ALL">ALL</option>
            <option value="Bill">Bill</option>
            <option value="Coffee">Coffee</option>
            <option value="Hobbies">Hobbies</option>
            <option value="Food & Drink">Food &amp; Drink</option>
          </select>
        </div>
      </div>
    </div>
  );
}
