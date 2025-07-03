import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

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

            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 overflow-y-scroll">
                        {page}

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="-mr-1 size-5 text-gray-400" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                        </svg>
                    </MenuButton>
                </div>

                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                    <div className="py-1">
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            const isCurrent = pageNumber === page;
                            return (
                                <MenuItem>
                                    <button
                                        key={pageNumber}
                                        onClick={() => handlePageClick(pageNumber)}
                                        className={`block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden ${isCurrent ? 'border-b-3 border-b-red-800 text-red-800' : 'text-gray-700'}`}
                                    >
                                        {pageNumber}
                                    </button>
                                </MenuItem>
                            );
                        })}
                    </div>
                </MenuItems>
            </Menu>

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
