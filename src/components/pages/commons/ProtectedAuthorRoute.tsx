import { Navigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getNotice } from "../../../api/notice";
import { Spinner, Box, Text } from "@chakra-ui/react";

const ProtectedAuthorRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>(); // Get the notice ID from the URL

  // Fetch user data from Redux
  const reduxUserEmail = useSelector((state: any) => state.auth?.user?.email);

  // Fetch the notice details to validate the author
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notice", id],
    queryFn: () => getNotice(Number(id)),
    enabled: !!id, // Fetch only if `id` exists
  });

  // While loading notice details, show a spinner
  if (isLoading) {
    return (
      <Box textAlign="center" mt="88px">
        <Spinner size="xl" />
        <Text mt={4}>Checking access permissions...</Text>
      </Box>
    );
  }

  // If fetching notice details failed, redirect to an error page or login
  if (isError || !data) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Check if the current user is the author of the notice
  const isAuthorized = data?.author?.email === reduxUserEmail;

  // If unauthorized, redirect to login
  if (!isAuthorized) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If authorized, render the child component
  return children;
};

export default ProtectedAuthorRoute;
