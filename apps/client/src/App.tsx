import Wallets from "./components/wallets";
import AppNavbar from "./components/appBar";

function App() {
  return (
    <div style={{ maxWidth: "60%", margin: "auto" }}>
      <AppNavbar />
      <Wallets />
    </div>
  );
}

export default App;
