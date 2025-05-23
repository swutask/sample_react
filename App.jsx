import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { AuthProvider } from "./context/authContext";
import { DemographicsProvider } from "./context/demographicsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  useEffect(() => {
    const id = "9c35268e-a72f-48c4-a07c-6c629c4ed2bb";
    var mf = document.createElement("script");
    mf.type = "text/javascript";
    mf.defer = true;
    mf.src = "https://cdn.mouseflow.com/projects/" + id + ".js";
    document.getElementsByTagName("head")[0].appendChild(mf);
  }, []);
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <DemographicsProvider>
              <Router>
                <Routes />
              </Router>
            </DemographicsProvider>
          </AuthProvider>
        </QueryClientProvider>
      </React.StrictMode>
    </div>
  );
}

export default App;
