import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="main">
        <NavLink to='/'>QuizJam</NavLink>
        <NavLink to='/signin'>Sign In</NavLink>
      </header>
    </>
  );
}
