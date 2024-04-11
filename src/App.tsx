import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./App.css";
import Gutter from "./Components/Gutter";
import StockDetail from "./Pages/StockDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./Components/ProtectedRoutes";
import Signup from "./Pages/Signup";
import { Toaster } from "./Components/ui/toaster"
import Login from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Gutter>
        <>
          <Routes>
            <Route index element={<Protected Components={<Dashboard />} />} />
            <Route
              path="/viewStockDetail/:id"
              element={<Protected Components={<StockDetail />} />}
            />
            <Route
              path="/register"
              element={<Protected Components={<Signup />} />}
            />

            <Route
            path="/login"
            element={<Protected Components={<Login />}></Protected>}
          />
          </Routes>
          {/* <StockDetail /> */}
        </>
      </Gutter>
    </BrowserRouter>
  );
}

export default App;
