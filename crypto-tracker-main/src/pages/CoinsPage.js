import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import ReactHtmlParser from "react-html-parser";

const CoinsPage = () => {
	const { id } = useParams();
	const { currency, symbol } = CryptoState();

	const [coin, setCoin] = useState();

	useEffect(() => {
		fetchCoin();
	}, []);

	console.log(coin);

	const fetchCoin = async () => {
		const { data } = await axios.get(SingleCoin(id));
		setCoin(data);
	};

	if (!coin) return <div>Loading...</div>;

	return (
		coin && (
			<div className='container mx-auto flex flex-col items-center lg:flex-row lg:justify-between lg:space-x-4'>
				{/* Sidebar */}
				<div className='flex mt-[75px] flex-col w-full px-3 items-center lg:w-1/4 lg:mt-0 lg:h-screen lg:justify-center'>
					{/* Image */}
					<img
						className='w-[200px]'
						src={coin?.image.large}
						alt='Coin-image'
						style={{ WebkitTransform: "translateZ(0)" }}
					/>
					{/* Coin Info */}
					<h1 className='text-5xl'>{coin?.name}</h1>
					<p className='text-gray-300 text-lg leading-relaxed text-center mt-4'>
						{ReactHtmlParser(coin?.description.en.split(". ")[0])}
					</p>

					{/* Market Data */}
					<div className='flex space-x-4 justify-center items-center mt-8'>
						<h2 className='text-2xl font-bold'>Rank:</h2>
						<p className='text-2xl font-thin'>{coin?.coingecko_rank}</p>
					</div>
					<div className='flex space-x-4 justify-center items-center mt-2'>
						<h2 className='text-2xl font-bold'>Current Price:</h2>
						<p className='text-2xl font-thin'>
							{symbol}
							{coin?.market_data.current_price[
								currency.toLowerCase()
							].toLocaleString("en-IN")}
						</p>
					</div>
					<div className='flex space-x-4 justify-center items-center mt-2 mb-6'>
						<h2 className='text-2xl font-bold'>Market Cap:</h2>
						<p className='text-2xl font-thin'>
							{symbol}
							{parseInt(
								coin?.market_data.total_volume[currency.toLowerCase()]
									.toString()
									.slice(0, -6)
							).toLocaleString("en-IN")}
							M
						</p>
					</div>
				</div>
				{/* Chart */}
				<div className='w-full lg:w-3/4'>
					<CoinInfo coin={coin} />
				</div>
			</div>
		)
	);
};

export default CoinsPage;
