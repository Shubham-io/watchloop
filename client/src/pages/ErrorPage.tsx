import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div>
          <h1 className="text-3xl font-bold">
            {error.status}
          </h1>

          <p>{error.statusText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold">
          Something went wrong
        </h1>

        <p>Please try again later.</p>
      </div>
    </div>
  );
}