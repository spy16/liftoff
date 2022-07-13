import React, { useEffect } from "react";
import {
  Text,
  VStack,
  Button,
  Divider,
  Heading,
  Textarea,
  CircularProgress,
  HStack,
} from "@chakra-ui/react";

import Header from "../components/Header";
import { useAuth } from "../config/authCtx";
import { getEntry, updateEntry } from "../api/guestbook";

function AdminPage() {
  const { user } = useAuth();

  const [isSaving, setIsSaving] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState("");

  useEffect(() => {
    if (user && user.email) {
      getEntry(user.email).then((doc) => {
        if (doc) {
          setData(doc?.message);
        }
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <VStack width="full" height="full">
      <Header />
      <VStack width="full" padding={3} spacing={2}>
        <Heading size="lg">Welcome {user?.displayName}!</Heading>
        <Text>{user?.email}</Text>
        <Divider width="full" maxW="500px" mt={3} mb={3} />

        <Text>Enter your message here. Your message will be saved.</Text>

        {loading && <CircularProgress size="25px" isIndeterminate />}
        {!loading && (
          <>
            <Textarea
              width="full"
              maxW="400px"
              resize="none"
              maxHeight="300px"
              variant="outline"
              padding={1}
              outline={0}
              defaultValue={data}
              placeholder="Leave a message here"
              onInput={(e) => {
                setData(e.currentTarget.value);
              }}
            />

            <HStack>
              {!isSaving && (
                <Button
                  size="sm"
                  variant="solid"
                  disabled={isSaving}
                  onClick={() => {
                    if (user && user.email) {
                      setIsSaving(true);
                      updateEntry(user.email, data)
                        .then((v) => {
                          console.log(v);
                        })
                        .catch((reason) => {
                          console.log(reason);
                        })
                        .finally(() => {
                          setIsSaving(false);
                        });
                    }
                  }}
                >
                  Save
                </Button>
              )}

              {isSaving && (
                <CircularProgress color="orange" size="25px" isIndeterminate />
              )}
            </HStack>
          </>
        )}
      </VStack>
    </VStack>
  );
}

export default AdminPage;
