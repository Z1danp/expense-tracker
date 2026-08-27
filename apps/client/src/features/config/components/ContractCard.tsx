interface ContractCardProps {
  signer: string;
  currentCycle: number;
  totalCycles: number;
}

export default function ContractCard({ signer, currentCycle, totalCycles }: ContractCardProps) {
  return (
    <div className="mx-4 border-2 border-acid-yellow">
      <div className="bg-red px-4 pt-3 pb-4">
        <span className="font-barlow font-bold text-white text-lg block mb-2">Contract</span>
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="bg-acid-yellow text-red font-bebas text-base px-0.5 inline-block w-fit">
              SIGNER: {signer.toUpperCase()}
            </span>
            <span className="bg-dark-maroon left-1 text-white font-bebas text-base px-2 py-0.5 relative w-fit">
              CYCLE: {currentCycle}/{totalCycles}
            </span>
          </div>
          <button className="bg-charcoal-gray text-white font-barlow font-bold text-base px-1 py-1 border-3 border-white cursor-pointer hover:bg-charcoal-gray hover:text-white">
            Amend Contract
          </button>
        </div>
      </div>
    </div>
  );
}
