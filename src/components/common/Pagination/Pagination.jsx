import Image from 'next/image';
import ReactPaginate from 'react-paginate';
import { useState } from "react";

export default function Launchpad({loadNFTs,pageCount}) {
  
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({selected}) => {
    console.log('Hmm '+selected);
    loadNFTs(selected);
    setCurrentPage(1);
  };

  const prevArrow = <Image src="/assets/images/left-arrow.png" width={39} height={39} alt="" />;
  const nextArrow = <Image src="/assets/images/right-arrow.png" width={39} height={39} alt="" />;

  return (
    <ReactPaginate
      forcePage = {currentPage}
      breakLabel="..."
      nextLabel={nextArrow}
      previousLabel={prevArrow}
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      className="pagination"
    />
  );
}
