import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles.scss';
import { HiUser } from 'react-icons/hi';

export default function Header() {
	const username = useSelector((state) => state.user.username);

	return (
		<>
			<header>
				<NavLink to='/' className='headerTitle'>
					QuizJam
				</NavLink>

					<NavLink to='/signin' className='headerUser'><HiUser /> {username}</NavLink>
			</header>
		</>
	);
}
