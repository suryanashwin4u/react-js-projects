import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
	return (
		<div
			className={`p-2 text-sm border border-gold rounded cursor-pointer ${
				selected && "bg-gold text-black font-bold"
			} lg:p-4 lg:text-base`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default SelectButton;
