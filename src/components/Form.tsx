import { useState } from 'react';
import axios from 'axios';
import { useEnmonApp } from '../AppContext';
import { validateLoginInput } from '../helpers/validateLoginInput';

export type LoginInput = {
  email: string;
  password: string;
};

const Form = () => {
  const [formData, setFormData] = useState<LoginInput>({
    email: 'homework@enmon.tech',
    password: 'GHrSyhF5m6M8G5PT',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>('');

  // take state management from Context
  const { handleLogIn, handleNewTableData } = useEnmonApp();

  // LOGIN functionality
  function handleSubmit() {
    async function attemptLogin(data: LoginInput) {
      setIsLoading(true);
      try {
        validateLoginInput(data); // simple validation, returns true if OK, throws Error if NOK

        // get JWT and save it for later use
        const {
          data: { jwt },
        } = await axios.post(import.meta.env.VITE_ENMON_POST_ROUTE, {
          identifier: data.email,
          password: data.password,
        });

        localStorage.setItem('accessToken', jwt);

        // get data using the JWT, restrict and paginate data
        const resourceLink = import.meta.env.VITE_ENMON_GET_ROUTE;
        const pagination = 'pagination[page]=1&pagination[pageSize]=25';

        const response = await axios.get(`${resourceLink}?${pagination}`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });

        // set data in the global tableData state
        console.log('Login Form line 48: TABLE data', response.data);
        handleNewTableData(response.data);

        setIsLoading(false);
        handleLogIn(); // set the global login state to true
      } catch (err: any) {
        if (err.code === 'ERR_BAD_REQUEST') {
          console.error('🔴request', err.message);
          setLoginError('Invalid credentials! Please try again');
        } else {
          console.error('💥LOGIN Error', err.message);
          setLoginError('There was an error : ' + err.message);
        }
        setIsLoading(false);
      }
    }
    attemptLogin(formData);
  }

  return (
    <>
      {/* a simple form styled using Pico css */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {loginError !== '' ? (
          <p style={{ color: 'red', fontWeight: 'bold' }}>{loginError}</p>
        ) : null}

        <button type="submit" disabled={isLoading} aria-busy={isLoading}>
          {isLoading ? ' Loading ...' : 'Login'}
        </button>
      </form>
    </>
  );
};

export default Form;
