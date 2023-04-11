import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const username = useSelector((state) => state.user.username);

  return (
    <>
      <header className="main">
        <NavLink to='/'>QuizJam</NavLink>
        <NavLink to='/signin'>Sign In</NavLink>
        {loggedIn && <div>Logged in!</div>}
        <div>
          {username}
        </div>
      </header>
    </>
  );
}
