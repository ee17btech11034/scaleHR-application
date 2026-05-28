interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationBar({ currentPage, totalPages, onPageChange }: PaginationBarProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm mt-6">
      <span className="text-xs font-medium text-slate-500">
        Showing page <strong className="text-slate-800">{currentPage}</strong> of {totalPages}
      </span>
      
      <div className="flex gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1.5 border border-slate-200 rounded-md text-xs font-medium bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1.5 border border-slate-200 rounded-md text-xs font-medium bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
