import { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  return (
    <div className="authBackground">
      <div className="auth">
        <AuthForm />
      </div>
    </div>
  );
};

const AuthForm = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      {showLogin ? (
        <Login toggleForm={toggleForm} />
      ) : (
        <Register toggleForm={toggleForm} />
      )}
    </div>
  );
};

const Login = ({ toggleForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/auth/login`,
        {
          username,
          password,
        }
      );

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("invalid username");
        alert("invalid Username");
      } else if (err.response && err.response.status === 401) {
        console.log("invalid password");
        alert("invalid Password");
      }
    }
  };

  return (
    <div>
      <Form
        label={"Login"}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
      />
      <p onClick={toggleForm} className="toggleLink">
        Don't have an account? Register
      </p>
    </div>
  );
};

const Register = ({ toggleForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_API}/auth/register`, {
        username,
        password,
      });
      alert("User successfully created. You can Login now");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert("User already exists");
      } else if (err.response && err.response.status === 401) {
        alert("Invalid Username or Password");
      }
      console.log(err);
    }
  };

  return (
    <div>
      <Form
        label={"Register"}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
      />
      <p onClick={toggleForm} className="toggleLink">
        Already have an account? Login
      </p>
    </div>
  );
};

const Form = ({
  label,
  username,
  setUsername,
  password,
  setPassword,
  onSubmit,
}) => {
  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h1 className="heading">{label}</h1>
        <div className="form-group">
          <label htmlFor="username" className="credlabel">
            Username :
          </label>
          <input
            type="text"
            id="username"
            className="credinput"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="credlabel">
            Password :
          </label>
          <input
            type="password"
            id="password"
            className="credinput"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" id="submitButton">
          Submit
        </button>
      </form>
    </div>
  );
};
