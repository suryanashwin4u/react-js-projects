import React from "react";
import Masonry from "react-masonry-css";
import Pic from "./Pic";

const breakpointObj = {
	default: 4,
	3000: 6,
	2000: 5,
	1200: 3,
	1000: 2,
	500: 1,
};

const MasonryLayout = ({ pics }) => {
	return (
		<Masonry className='flex animate-slide-fwd' breakpointCols={breakpointObj}>
			{pics?.map((pic) => (
				<Pic key={pic._id} pic={pic} className='w-max' />
			))}
		</Masonry>
	);
};

export default MasonryLayout;
