import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.log('error page');

  return (
    <div id="error-page">
      <h1 style={{marginLeft:"50%"}}>Oops!</h1>
      <p style={{marginLeft:"44%"}}> Sorry, an unexpected error has occurred.</p>
    </div>
  );
}