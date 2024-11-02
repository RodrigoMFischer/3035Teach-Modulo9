import deco from '/assets/deco.png';

export function Deco(){

	return (
		<div
			className="fixed top-0 h-full w-screen bg-repeat-y z-10"
			style={{ backgroundImage: `url(${deco})`, backgroundPosition: 'right', pointerEvents: 'none'}}
	  ></div>
	);
}