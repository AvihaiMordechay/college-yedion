import { useUser } from "context/UserContext";

const MessagingSystem = () => {
  const { user } = useUser();

  return <h1>hello</h1>;
};

export default MessagingSystem;
