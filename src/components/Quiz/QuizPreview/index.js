import { useState, useEffect } from 'react';
import * as database from '../../../database';
import { Link } from 'react-router-dom';

export default function QuizPreview({
	id,
	title,
	author,
	results,
	questions
}) {
	const [authorDisplayName, setAuthorDisplayName] = useState('');

	useEffect(() => {
		(async () => {
			setAuthorDisplayName(await database.GetDisplayNameFromId(author));
			// setIsLoading(false);
		})();
		// eslint-disable-next-line
	}, []);

	return (
		<div >
				<Link to={'/quiz/' + id}>
					<h3>{title}</h3>
					<p>Author: {authorDisplayName}</p>
					<p>Questions: {questions.length}</p>
					<p>Possible Results: {results.length}</p>
				</Link> 
		</div>
	);
}
