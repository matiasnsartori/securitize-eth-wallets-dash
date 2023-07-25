import Wallets from "./components/wallets";
import AppNavbar from "./components/appBar";

function App() {
  return (
    <div style={{ maxWidth: "70%", margin: "auto" }}>
      <AppNavbar />
      <Wallets />
    </div>
  );
}

export default App;
