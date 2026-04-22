import { useAuth0 } from "@auth0/auth0-react";

function Login() {
  const {
    isLoading, // Loading state, the SDK needs to reach Auth0 on load
    isAuthenticated,
    error,
    loginWithRedirect: login, // Starts the login flow
    user, // User profile
  } = useAuth0();

  const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

  if (isLoading) return "Loading...";

  if (isAuthenticated) {
    fetch("http://127.0.0.1:8000/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  }

  return isAuthenticated ? (
    <>
      <p>Logged in as {user.email}</p>

      <h1>User Profile</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  ) : (
    <div className="relative flex flex-col w-full max-w-md bg-gray-400/50 gap-4 rounded-2xl p-8 shadow-xl border border-slate-200 z-10">
      {error && <p>Error: {error.message}</p>}
      <div className="text-6xl text-center text-black/85 p-4 w-full font-bold  text-shadow-lg font-sans ">
        WELCOME
      </div>

      <button
        className="bg-blue-500 text-white rounded-lg p-3 text-lg hover:bg-blue-600 hover:shadow-lg/55 transition drop-shadow-xl text-shadow-lg text-bold"
        onClick={login}
      >
        Login
      </button>

      <button
        className="bg-blue-500 text-white rounded-lg p-3  text-lg hover:bg-blue-600 hover:shadow-lg/55 transition drop-shadow-xl text-shadow-lg text-bold"
        onClick={signup}
      >
        Sign Up
      </button>
    </div>
  );
}

export default Login;
