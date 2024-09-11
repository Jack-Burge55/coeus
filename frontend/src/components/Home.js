import { useNavigate } from "react-router-dom";

const Home = ({ setCoeusUser, coeusUser }) => {
  const navigate = useNavigate();

  const findUsers = () => {
    navigate(`/find-users`)
  }

  const signOut = () => {
    setCoeusUser(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const goToProfile = () => {
    navigate(`/profile/${coeusUser.userId}`);
  };

  return (
    <>
      <h1>Home</h1>
      <button onClick={() => findUsers()}>Find Users</button>
      <button onClick={() => signOut()}>Sign Out</button>
      <button onClick={() => goToProfile()}>Go To Your Profile</button>
    </>
  );
};

export default Home;
