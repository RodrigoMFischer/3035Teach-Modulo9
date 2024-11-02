import { useEffect, useState } from 'react';

interface ButtonProps {
    icon: string;
    title?: string;
	isRounded?: boolean;
	onClick?: () => void;
}

export function Button({ icon, title, isRounded = false, onClick }: ButtonProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <button
            type="button"
            className="flex items-center lg:justify-start lg:p-[30px] lg:border gap-x-[30px] lg:border-btn-border-feed-gray rounded-2xl lg:min-w-[250px] min-h-[90px] max-h-[90px]"
			onClick={onClick}
        >
			<img 
				className={`lg:max-h-[44px] lg:max-w-[44px] max-h-8 max-w-8 ${isRounded ? 'rounded-full' : ''}`}
				src={icon} 
				alt={title ? `Ícone de ${title}` : 'Ícone'}
			/>
            {title && !isMobile && (
                <span className="text-xl text-btn-feed-gray">{title}</span>
            )}
        </button>
    );
}
