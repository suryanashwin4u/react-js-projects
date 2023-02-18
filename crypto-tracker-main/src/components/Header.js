import React from "react";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const Header = () => {
	const history = useHistory();

	const { currency, setCurrency } = CryptoState();
	console.log(currency);
	return (
		<div className='w-screen z-10 py-4 px-8 bg-darkGray fixed top-0 flex justify-between'>
			<h2
				className='text-2xl font-bold text-gold cursor-pointer'
				onClick={() => history.push("/")}
			>
				CryptoTracker
			</h2>
			<select
				className='bg-darkGray outline-none'
				value={currency}
				onChange={(e) => setCurrency(e.target.value)}
			>
				<option value='INR'>INR</option>
				<option value='USD'>USD</option>
			</select>
		</div>
	);
};

export default Header;
