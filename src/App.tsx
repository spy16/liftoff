import * as React from "react";
import { ChakraProvider, VStack } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import theme from "./config/theme";
import routes from "./config/routes";
import RequireAuth from "./components/RequireAuth";
import AuthProvider from "./config/authCtx";

export const App = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <BrowserRouter>
        <VStack width="full" height="full">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.secure ? (
                    <RequireAuth>
                      <route.element />
                    </RequireAuth>
                  ) : (
                    <route.element />
                  )
                }
              />
            ))}
          </Routes>
        </VStack>
      </BrowserRouter>
    </AuthProvider>
  </ChakraProvider>
);
