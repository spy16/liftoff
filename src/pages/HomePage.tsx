import {
  Heading,
  HStack,
  IconButton,
  Show,
  Text,
  VStack,
  Button,
  CircularProgress,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../config/authCtx";

function HomePage() {
  const { user, signIn, loading } = useAuth();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);

  return (
    <HStack width="100vw" height="100vh" spacing={0}>
      <Show above="md">
        <HStack
          width="40%"
          height="full"
          bgColor="#EEF5FF"
          alignItems="center"
        ></HStack>
      </Show>
      <HStack
        width={{ base: "100%", md: "60%" }}
        height="full"
        bgColor="white"
        alignItems="center"
      >
        <VStack width="full" height="500px" margin="0 auto" marginTop="150px">
          <Heading
            size="lg"
            bgClip="text"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
          >
            🚀 LiftOff
          </Heading>

          <VStack padding={3}>
            {loading && <CircularProgress size="25px" isIndeterminate />}

            {!loading && !user && (
              <>
                <Text color="gray.600">
                  Login with your Google Account to continue.
                </Text>

                <IconButton
                  size="lg"
                  padding={3}
                  disabled={disabled}
                  variant="outline"
                  icon={
                    <HStack>
                      <FcGoogle size="40px" />
                      <Text>SignIn with Google</Text>
                    </HStack>
                  }
                  marginTop={5}
                  aria-label="SignIng with Google"
                  onClick={() => {
                    setDisabled(true);
                    signIn(() => {
                      navigate("/admin");
                      setDisabled(false);
                    });
                  }}
                />
              </>
            )}

            {!loading && user && (
              <VStack>
                <Heading size="md">You are already logged in.</Heading>
                <Link to="/admin">
                  <Button variant="outline">Admin Page</Button>
                </Link>
              </VStack>
            )}
          </VStack>
        </VStack>
      </HStack>
    </HStack>
  );
}

export default HomePage;
