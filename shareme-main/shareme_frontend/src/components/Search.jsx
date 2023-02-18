import React, { useState, useEffect } from "react";
import MasonryLayout from "./MasonryLayout";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./Spinner";

const Search = ({ searchTerm, setSearchTerm }) => {
	const [pics, setPics] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		if (searchTerm) {
			const query = searchQuery(searchTerm.toLowerCase());
			client.fetch(query).then((data) => {
				setPics(data);
				setLoading(false);
			});
		} else {
			client.fetch(feedQuery).then((data) => {
				setPics(data);
				setLoading(false);
			});
		}
	}, [searchTerm]);

	return (
		<div>
			{loading && <Spinner message='Searching for Pics' />}
			{pics?.length !== 0 && <MasonryLayout pics={pics} />}
			{pics?.length === 0 && searchTerm !== "" && !loading && (
				<div className='mt-10 text-center text-xl'>No Pics Found...</div>
			)}
		</div>
	);
};

export default Search;
