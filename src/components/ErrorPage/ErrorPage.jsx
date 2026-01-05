import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div>
      <h1>Route Not Found</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export default ErrorPage;
