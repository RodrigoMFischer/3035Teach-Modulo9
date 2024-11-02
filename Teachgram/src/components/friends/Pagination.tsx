import action from '/public/assets/pagination_action.svg';

interface PaginationProps {
    length: number,
    defaultSize: number,
    onPageChange: (page: number) => void,
    currentPage: number 
}

export function Pagination({ length, defaultSize, onPageChange, currentPage }: PaginationProps) {
    const totalPages = Math.ceil(length / defaultSize); 
    const pageButtons = []; 

    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
		const isActive = pageNumber === currentPage; 
		pageButtons.push(
			<button 
				key={pageNumber} 
				className={`flex items-center justify-center w-10 border-2 p-2 rounded-lg text-base transition-all duration-300 
							${isActive ? 'bg-custom-red text-white shadow-lg' : 'text-[#c4c4c4] hover:bg-gray-200'} 
							${isActive ? 'border-transparent' : 'border-gray-300'} 
							${isActive ? 'cursor-default' : 'cursor-pointer'}`} 
				onClick={() => !isActive && onPageChange(pageNumber)}
			>
				{pageNumber}
			</button>
		);
	}
	
    return (
        <div className="flex gap-3 place-self-center mt-auto lg:pt-0 pt-6">
            <button 
                className={`flex items-center justify-center w-10 border-2 rounded-lg p-2 text-[#c4c4c4] 
					${currentPage === 1 ? 'cursor-not-allowed' : ''}`} 
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))} 
                disabled={currentPage === 1} 
            >
                <img src={action} alt="Previous" />
            </button>
			
            {pageButtons}

            <button 
				className={`flex items-center justify-center w-10 border-2 rounded-lg p-2 text-[#c4c4c4] 
							${currentPage === totalPages ? 'cursor-not-allowed' : ''}`} 
				onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} 
				disabled={currentPage === totalPages} 
			>
				<img className='rotate-180' src={action} alt="Next" />
			</button>

        </div>
    );
}
