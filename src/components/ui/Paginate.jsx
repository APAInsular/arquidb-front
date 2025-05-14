const Paginate = ({ page, setPage, totalPages }) => {
    const handlePrevious = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        if (pageNumber !== page) {
            setPage(pageNumber);
        }
    };

    return (
        <nav className="mb-2 flex justify-end space-x-2" aria-label="Pagination">
            <button
                onClick={handlePrevious}
                disabled={page === 1}
                className={`px-2 py-2 text-gray-700 ${page === 1 ? ' opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
                <span className="sr-only">Previous</span>
                <svg
                    className="mt-0.5 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                const isCurrent = pageNumber === page;
                return (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageClick(pageNumber)}
                        className={` transition-all cursor-pointer border-b-3 hover:border-b-red-800/20  border-transparent  px-4 py-2 ${isCurrent ? 'border-b-3 border-b-red-800 text-red-800' : 'text-gray-700'}`}
                    >
                        {pageNumber}
                    </button>
                );
            })}

            <button
                onClick={handleNext}
                disabled={page === totalPages}
                className={`px-2 py-2 text-gray-700 ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
                <span className="sr-only">Next</span>
                <svg
                    className="mt-0.5 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </nav>
    );
};

export default Paginate;
