import React from "react";
import { useNavigate } from "react-router-dom";
import { Heading, HStack, Spacer } from "@chakra-ui/react";

import { useAuth } from "../config/authCtx";
import UserButton from "./UserButton";

type Props = {};

function Header({}: Props) {
  const { user, signIn, signOut, loading } = useAuth();
  const navigate = useNavigate();

  return (
    <HStack width="full" height="50px" p={0} px={2} boxShadow="sm">
      <Heading
        size="lg"
        bgClip="text"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
      >
        🚀 <span>LiftOff</span>
      </Heading>
      <Spacer />
      <UserButton
        loading={loading}
        user={user}
        onClick={(isLogout) => {
          if (isLogout) {
            signOut(() => navigate("/"));
          } else {
            signIn(() => navigate("/admin"));
          }
        }}
      />
    </HStack>
  );
}

export default Header;
