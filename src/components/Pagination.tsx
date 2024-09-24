type PaginationProps = {
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
  onChangePage: (page: number) => void;
};

const Pagination = ({
  totalPages,
  itemsPerPage,
  currentPage,
  onChangePage,
}: PaginationProps) => {
  const totalItems = Math.ceil(totalPages / itemsPerPage);

  return (
    <div className="pagination">
      {Array.from({ length: totalItems }, (_, index) => (
        <button
          key={index}
          disabled={index + 1 === currentPage}
          onClick={() => onChangePage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
