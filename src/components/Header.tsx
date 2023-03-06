import { useEnmonApp } from '../AppContext';

// get in data for state management from Context, then render a button to Log Out of the app
function Header() {
  const { handleLogOut, isLoggedIn } = useEnmonApp();
  return (
    <>
      <nav className="header-section">
        {isLoggedIn && (
          <button role="button" onClick={handleLogOut}>
            Log out
          </button>
        )}
      </nav>
    </>
  );
}

export default Header;
