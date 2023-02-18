import React from "react";
import Banner from "../components/Banner/Banner";
import CoinsTable from "../components/CoinsTable";

const HomePage = () => {
	return (
		<div className='mt-4'>
			<Banner />
			<CoinsTable />
		</div>
	);
};

export default HomePage;
