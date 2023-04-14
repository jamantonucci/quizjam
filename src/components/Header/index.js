import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles.scss';
import { HiUser } from 'react-icons/hi';

export default function Header() {
	const username = useSelector((state) => state.user.username);
	const loggedIn = useSelector((state) => state.user.loggedIn);

	return (
		<>
			<header>
				<NavLink to='/' className='headerTitle'>
					QuizJam
				</NavLink>
				{loggedIn && (
					<NavLink to='/settings' className='headerUser'>
						<HiUser />
						{username}
					</NavLink>
				)}
				{!loggedIn && (
					<NavLink to='/signin' className='headerUser'>
						<HiUser />
						Sign In
					</NavLink>
				)}
			</header>
		</>
	);
}
