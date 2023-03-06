import './App.css';
import '@picocss/pico/css/pico.min.css';
import Form from './components/Form';
import { useEnmonApp } from './AppContext';
import Header from './components/Header';
import { EditableTable } from './components/EditableTable';

// TODO refactoring

// TODO branch workflow
// TODO remove password hardcoding
// TODO write README
// TODO

function App() {
  // grab state from Context
  const { isLoggedIn } = useEnmonApp();

  return (
    <main className="container">
      <Header />
      {!isLoggedIn ? (
        <h1>Hello! Please log in to continue.</h1>
      ) : (
        <h1>Welcome!</h1>
      )}
      {!isLoggedIn ? <Form /> : <EditableTable />}
    </main>
  );
}

export default App;
