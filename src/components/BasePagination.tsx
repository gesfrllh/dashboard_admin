import React, { useState, useEffect } from 'react';
import { Pagination } from '../types';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";


const BasePagination: React.FC<Pagination> = ({ current_page, total, per_page, last_page, onPageChange }) => {
  const totalPages = Math.ceil(total / per_page);
  const [currentPage, setCurrentPage] = useState<number>(current_page);
  useEffect(() => {
    setCurrentPage(current_page);
  }, [current_page]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  return (
    <div className="p-4 w-full flex justify-between items-center border-t-2">

      <span className='text-sm'>{`Total Data : ${total}`}</span>
      <div className='flex gap-4 items-center justify-center'>
        <span className='text-sm'>{`Page ${currentPage} of ${totalPages}`}</span>
        <div className='flex'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='hover:rounded-xl hover:bg-blue-200 hover:ease-in-out hover:transition-all hover:duration-200 hover:text-white cursor-pointer'
          >
            <MdKeyboardArrowLeft size={24} />
          </button>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='hover:rounded-xl hover:bg-blue-200 hover:ease-in-out hover:transition-all hover:duration-200 hover:text-white cursor-pointer'
          >
            <MdKeyboardArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasePagination;
