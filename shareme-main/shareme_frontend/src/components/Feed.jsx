import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
	const [loading, setLoading] = useState(false);
	const [pics, setPics] = useState(null);
	const { categoryId } = useParams();

	useEffect(() => {
		setLoading(true);
		if (categoryId) {
			const query = searchQuery(categoryId);
			client.fetch(query).then((data) => {
				setPics(data);
				setLoading(false);
			});
		} else {
			client.fetch(feedQuery).then((data) => {
				let pics = data.filter((d) => d._id.split(".")[0] !== "drafts");
				setPics(pics);
				setLoading(false);
			});
		}
	}, [categoryId]);

	if (loading) return <Spinner message='We are adding new ideas to your feed...' />;
	if (!pics?.length) return <h2>No Pics Available</h2>;

	return <div>{pics && <MasonryLayout pics={pics} />}</div>;
};

export default Feed;
