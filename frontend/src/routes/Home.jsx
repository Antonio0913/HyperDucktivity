import React from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser
} from "@clerk/clerk-react";

const Home = () => {
  const { user, isLoaded } = useUser();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>

      <nav>
        <Link to="/categories">View Todo Categories</Link>
      </nav>
      <nav>
        <Link to="/taskPage">View TaskPage</Link>
      </nav>
      <br />

      <header>
        <SignedOut>
          <SignInButton />
          <p>User is not signed in</p>
        </SignedOut>
        <SignedIn>
          <UserButton />
          <p>User is signed in</p>
          {isLoaded && user && <p>Clerk User ID: {user.id}</p>}
        </SignedIn>
      </header>
    </div>
  );
};

export default Home;
