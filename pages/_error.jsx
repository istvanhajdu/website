import { MainContainer } from "../components/containers";

const statusCodes = {
  400: "Bad Request",
  404: "Page not found",
  405: "Method Not Allowed",
  500: "Internal Server Error",
};

function CustomError({ statusCode }) {
  const msg = `${statusCode}: ${statusCodes[statusCode] || ""}.`;
  return (
    <MainContainer>
      <h1>
        {statusCode
          ? msg
          : "An unexpected error occurred. Please refresh and try again."}
      </h1>
    </MainContainer>
  );
}

CustomError.getInitialProps = ({ asPath, res, err }) => {
  if (asPath.endsWith("/")) {
    res.writeHead(302, { Location: asPath.substring(0, asPath.length - 1) });
    return res.end();
  }

  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomError;
