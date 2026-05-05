import { useAuth0 } from "@auth0/auth0-react";
import logo256 from "../assets/logo256.png";
import RightsidePic from "../assets/rightside-pic.png";

function Login() {
  const {
    isLoading, // Loading state, the SDK needs to reach Auth0 on load
    isAuthenticated,
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
    <div className="grid w-full max-w-6xl min-h-[75vh] grid-cols-1 overflow-hidden rounded-3xl bg-[#F2F2F2] shadow-2xl md:grid-cols-[1fr_2fr]">
      <div className="w-full h-full px-8 py-8 flex flex-col">
        <div className="flex items-start">
          <img src={logo256} alt="Logo" className="h-36 w-auto" />
        </div>
        <div className=" text-4xl font-bold p-3.5">
          Understand your finances. Make smarter decisions
        </div>
        <div className="text-md text-gray-600 p-3.5">
          FYF helps you track, analyze, and improve your financial future.
        </div>
        <div className="relative flex flex-col w-full   gap-4  pt-6 z-10 ">
          <button
            className="w-full bg-[#1851e6] text-white rounded-xl py-4 text-lg
            hover:bg-blue-600 transition shadow-md hover:shadow-lg"
            onClick={login}
          >
            Login
          </button>
          <button
            className="w-full border border-gray-500 text-[#1851e6] rounded-xl py-4 text-lg
            hover:bg-gray-100 transition"
            onClick={signup}
          >
            Create an account
          </button>
        </div>
      </div>
      <div className="hidden md:flex h-full w-full items-center justify-center overflow-hidden bg-[#071532]">
        <img
          src={RightsidePic}
          alt="Right Side"
          className="w-full h-full object-cover z-10"
        />
      </div>
    </div>
  );
}

export default Login;
