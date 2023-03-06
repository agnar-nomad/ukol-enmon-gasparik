import { useEnmonApp } from '../AppContext';

// get in data for state management form Context and render a button to Log Out of the app
function Header() {
  const { handleLogOut, isLoggedIn } = useEnmonApp();
  return (
    <>
      <nav className="header-section">
        {isLoggedIn && (
          <button role="button" onClick={handleLogOut}>
            Log Out
          </button>
        )}
      </nav>
    </>
  );
}

export default Header;
