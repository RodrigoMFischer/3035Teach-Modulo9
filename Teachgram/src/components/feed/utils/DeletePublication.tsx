import { usePostContext } from "../../../context/PostsContext";

interface DeletePublicationProps {
	postId: number,
	closeModal: () => void
}

export function DeletePublication({ postId, closeModal }: DeletePublicationProps){

	const { deletePost } = usePostContext();
	
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
		  <div className="bg-white shadow flex flex-col items-center justify-center py-14 px-10 space-y-8 rounded-lg"> 
			<h3 className="text-black font-semibold text-xl">Excluir publicação?</h3>
			<div className="flex space-x-12">
			  <button onClick={closeModal}
				className="text-custom-red rounded-lg text-sm border-custom-red border bg-transparent px-4 py-2"
			  >Cancelar</button>
			  <button
				onClick={() => deletePost(postId)}
				className="bg-custom-red text-white text-sm rounded-lg shadow px-4 py-2"
			  >Confirmar</button>
			</div>
		  </div>
		</div>
	  );
}