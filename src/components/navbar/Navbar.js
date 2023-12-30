import Logo from "./Logo";
import Search from "./Search";
import NumberOfResults from "./NumberOfResults";

const Navbar = function ({ movies }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumberOfResults movies={movies} />
    </nav>
  );
};

export default Navbar;
