import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const CoinInfo = ({ coin }) => {
	const { currency } = CryptoState();

	const [historicalData, setHistoricalData] = useState();
	const [days, setDays] = useState(1);

	const fetchHistoricalData = async () => {
		const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
		setHistoricalData(data.prices);
	};

	useEffect(() => {
		fetchHistoricalData();
	}, [currency, days]);

	if (historicalData === undefined) return <div>Loading...</div>;

	const printer = () => {
		console.log(historicalData);
	};

	return (
		<div className='container mx-auto w-[90%] flex flex-col items-center justify-center lg:h-screen'>
			{/* Chart */}
			{printer()}
			<Line
				data={{
					labels: historicalData.map((coin) => {
						let date = new Date(coin[0]);
						let time =
							date.getHours() > 12
								? `${date.getHours() - 12}:${date.getMinutes()} PM`
								: `${date.getHours()}:${date.getMinutes()} AM`;
						return days === 1 ? time : date.toLocaleDateString();
					}),

					datasets: [
						{
							data: historicalData.map((coin) => coin[1]),
							label: `Price ( Past ${days} Days ) in ${currency}`,
							borderColor: "#EEBC1D",
						},
					],
				}}
				options={{
					elements: {
						point: {
							radius: 1,
						},
					},
				}}
			/>

			{/* Buttons */}
			<div className='flex space-x-4 mt-4'>
				{chartDays.map((day) => (
					<SelectButton
						key={day.value}
						onClick={() => setDays(day.value)}
						selected={day.value === days}
					>
						{day.label}
					</SelectButton>
				))}
			</div>
		</div>
	);
};

export default CoinInfo;
