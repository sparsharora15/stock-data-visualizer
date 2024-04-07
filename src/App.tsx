import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./App.css";
import Gutter from "./Components/Gutter";
import StockDetail from "./StockDetail";

function App() {
  return (
    <Gutter>
      <StockDetail />
    </Gutter>
  );
}

export default App;
