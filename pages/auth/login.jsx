import {useEffect, useState} from "react";
import useLogin from "../../hooks/auth/login";
import {useRouter} from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [save, setSave] = useState(false);
  const router = useRouter();

  const response = useLogin(save, email, password);

  useEffect(() => {
    if (save) {
      response
        .then((response) => {
          localStorage.setItem('token', response.authorisation.token);

          router.push('/');
        })
        .catch(error => setError(error))
        .finally(() => setSave(false));
    }
  }, [save]);

  const handleEmail = ({target}) => {
    setEmail(target.value);
  }

  const handlePassword = ({target}) => {
    setPassword(target.value);
  }

  return (
    <div>
      <input type="text" name="email" value={email} onChange={handleEmail}/>
      <input type="password" name="password" value={password} onChange={handlePassword}/>

      <button type="button" onClick={() => setSave(true)}>
        Submit
      </button>

      { error && (
        <p>{error.message}</p>
      )}
    </div>
  )
}