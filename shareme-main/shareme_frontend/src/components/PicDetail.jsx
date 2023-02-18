import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { BiRefresh } from "react-icons/bi";
import { Link, useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import { picDetailMorePicQuery, picDetailQuery } from "../utils/data";
import Spinner from "./Spinner";

const PicDetail = ({ user }) => {
	const [pics, setPics] = useState(null);
	const [picDetail, setPicDetail] = useState(null);
	const [comment, setComment] = useState("");
	const [addingComment, setAddingComment] = useState(false);
	const [showInfo, setShowInfo] = useState(false);
	const [seed, setSeed] = useState(Math.random());
	const { picId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		fetchPicDetails();
	}, [picId]);

	const fetchPicDetails = () => {
		let query = picDetailQuery(picId);

		if (query) {
			client.fetch(query).then((data) => {
				setPicDetail(data[0]);
				console.log(data[0]?.comments);
				if (data[0]) {
					query = picDetailMorePicQuery(data[0]);
					client.fetch(query).then((data) => {
						setPics(data);
					});
				}
			});
		}
	};

	const addComment = () => {
		console.log(picDetail?.comments);
		if (comment) {
			console.log(comment);
			setAddingComment(true);
			client
				.patch(picId)
				.setIfMissing({ comments: [] })
				.insert("after", "comments[-1]", [
					{
						comment,
						_key: uuidv4(),
						postedBy: {
							_type: "postedBy",
							_ref: user._id,
						},
					},
				])
				.commit()
				.then(() => {
					fetchPicDetails();
					setComment("");
					setAddingComment(false);
					setShowInfo(true);
					setInterval(() => {
						setShowInfo(false);
					}, 5000);
				});
		}
	};

	const refreshComponent = () => {
		fetchPicDetails();
	};

	if (!picDetail) return <Spinner />;

	return (
		<>
			<div
				className='flex xl:flex-row flex-col m-auto bg-white relative'
				style={{ maxWidth: "1500px", borderRadius: "32px" }}
			>
				{showInfo && (
					<div className='absolute -top-10 left-0 w-full flex justify-center items-center'>
						<div className='bg-green-200 text-green-800 p-4 rounded-lg border-green-400 border-2'>
							Changes would be visible within 5 mins...
						</div>
					</div>
				)}
				<div className='flex justify-center items-center md:items-start flex-initial'>
					<img
						src={picDetail?.image && urlFor(picDetail.image).url()}
						alt='user-post'
						className='rounded-t-3xl rounded-b-lg'
					/>
				</div>
				<div className='w-full p-5 flex-1 xl:min-w-620'>
					<div className='flex items-center justify-between'>
						<div className='flex gap-2 items-center'>
							<a
								className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
								href={`${picDetail.image?.asset?.url}?dl`}
								download
								onClick={(e) => e.stopPropagation()}
							>
								<MdDownloadForOffline />
							</a>
						</div>
						<a href={picDetail.destination} rel='noreferrer' target='_blank'>
							{picDetail.destination}
						</a>
					</div>
					<div>
						<h1 className='text-4xl font-bold break-words mt-3'>{picDetail.title}</h1>
						<p className='mt-3'>{picDetail.about}</p>
					</div>
					<Link
						to={`/user-profile/${picDetail.postedBy?._id}`}
						className='flex gap-2 mt-5 items-center bg-white rounded-lg'
					>
						<img
							className='w-8 h-8 rounded-full object-cover'
							src={picDetail.postedBy?.image}
							alt='user-profile'
						/>
						<p className='font-semibold capitalize'>{picDetail.postedBy?.userName}</p>
					</Link>
					<div className='flex items-end '>
						<h2 className='mt-5 text-2xl'>Comments</h2>
						<button
							className='p-1 ml-2 rounded-full opacity-75 hover:opacity-100 hover:shadow-md outline-none '
							onClick={(e) => {
								refreshComponent();
							}}
						>
							<BiRefresh fontSize={20} />
						</button>
					</div>

					<div className='max-h-370 overflow-y-auto'>
						{picDetail?.comments?.map((comment, i) => (
							<div key={i} className='flex gap-2 mt-5 items-center bg-white rounded-lg'>
								<img
									src={comment.postedBy.image}
									alt='user'
									className='w-10 h-10 rounded-full cursor-pointer'
									onClick={() => {
										navigate(`/user-profile/${user?._id}`, { replace: true });
									}}
								/>
								<div className='flex flex-col'>
									<p className='font-bold'>{comment.postedBy.userName}</p>
									<p>{comment.comment}</p>
								</div>
							</div>
						))}
					</div>
					<div className='flex flex-wrap mt-6 gap-3 items-center'>
						<Link to={`/user-profile/${user?._id}`}>
							<img
								className='w-8 h-8 rounded-full cursor-pointer'
								src={user?.image}
								alt='user-profile'
							/>
						</Link>
						<input
							type='text'
							className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300'
							placeholder='Add a comment...'
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						<button
							type='button'
							className='bg-red-500 text-white px-6 py-2 font-semibold text-base outline-none rounded-full'
							onClick={addComment}
						>
							{addingComment ? "Posting the comment..." : "Post"}
						</button>
					</div>
				</div>
			</div>
			{pics?.length > 0 ? (
				<>
					<h2 className='text-center font-bold text-2xl mt-8 mb-4'>More Like This...</h2>
					<MasonryLayout pics={pics} />
				</>
			) : (
				<Spinner />
			)}
		</>
	);
};

export default PicDetail;
