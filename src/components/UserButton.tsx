import React from "react";
import {
  Text,
  CircularProgress,
  IconButton,
  Avatar,
  HStack,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { User } from "firebase/auth";

type Props = {
  user: User | null;
  loading: boolean;
  onClick: (isLogout: boolean) => void;
};

function UserButton({ loading, user, onClick }: Props) {
  return (
    <>
      {loading && <CircularProgress size="25px" isIndeterminate />}

      {!loading && user && (
        <IconButton
          aria-label="Logout"
          fontStyle="normal"
          icon={
            <HStack padding={1}>
              <Avatar size="sm" src={user.photoURL || ""} />
              <Text>Logout</Text>
            </HStack>
          }
          onClick={() => onClick(true)}
        />
      )}

      {!loading && !user && (
        <IconButton
          aria-label="Login"
          icon={<FcGoogle size="25px" />}
          onClick={() => onClick(false)}
        />
      )}
    </>
  );
}

export default UserButton;
