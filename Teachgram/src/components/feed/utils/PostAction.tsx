import { useState } from "react";
import { DeletePublication } from "./DeletePublication";

interface PostActionProps {
	postId: number
}

export function PostAction({ postId }: PostActionProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
 	const closeModal = () => setIsModalOpen(false);

	return (
		<>		
		<div className="flex flex-col g-4 bg-white shadow rounded px-4 py-2">
			<button className="bg-transparent text-custom-red text-base">Editar</button>
			<button
				onClick={openModal}
			className="bg-transparent text-custom-red text-base">Excluir</button>
		</div>

		{isModalOpen && <DeletePublication postId={postId} closeModal={closeModal} />}
		</>


	);
}