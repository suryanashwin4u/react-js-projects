import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";

import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";

const Carousel = () => {
	const { currency, symbol } = CryptoState();

	const [trending, setTrending] = useState([]);

	const fetchTrendingCoins = async () => {
		const { data } = await axios.get(TrendingCoins(currency));
		setTrending(data);
	};
	useEffect(() => {
		fetchTrendingCoins();
	}, [currency]);

	const responsive = {
		0: {
			items: 2,
		},
		512: {
			items: 5,
		},
	};

	const items = trending.map((coin) => {
		const profit = coin?.price_change_percentage_24h > 0;
		return (
			<Link
				to={`/coins/${coin?.id}`}
				className='flex flex-col items-center space-y-1'
			>
				<img
					className='w-20 h-20 mb-2'
					src={coin?.image}
					alt={coin.name}
					style={{ WebkitTransform: "translateZ(0)" }}
				/>
				<div className='flex'>
					<p className='mr-2 text-lg text-white'>{coin?.name}</p>
					<p className={profit ? "text-green-600" : "text-red-600"}>
						{profit && "+"}
						{coin?.price_change_percentage_24h?.toFixed(2)}%
					</p>
				</div>
				<p className='text-lg font-bold'>
					{symbol}
					{coin?.current_price.toLocaleString("en-IN")}
				</p>
			</Link>
		);
	});

	return (
		<div className='flex items-center w-full'>
			<AliceCarousel
				mouseTracking
				infinite
				autoPlayInterval={1000}
				animationDuration={1500}
				disableDotsControls
				responsive={responsive}
				autoPlay
				disableButtonsControls
				items={items}
			/>
		</div>
	);
};

export default Carousel;
