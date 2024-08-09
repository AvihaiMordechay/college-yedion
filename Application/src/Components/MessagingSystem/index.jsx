import { useUser } from "context/UserContext";

const MessagingSystem = () => {
  const { user } = useUser();
  console.log(user);
  return <h1>hello</h1>;
};

export default MessagingSystem;
