import { useState, useEffect } from 'react';
import * as database from '../../../database';
import { Link } from 'react-router-dom';
import './styles.scss';

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
		<div className='quizPreviewContainer'>
				<Link to={'/quiz/' + id} className='quizPreview'>
					<h3>{title}</h3>
					<p className='authorField'>Author: {authorDisplayName}</p>
					<div className='quizPreviewInfo'>
						<span>Questions: <strong>{questions.length}</strong></span>
						<span>Possible Results: <strong>{results.length}</strong></span>
					</div>
				</Link> 
		</div>
	);
}
