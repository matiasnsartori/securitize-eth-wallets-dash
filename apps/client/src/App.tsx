import Wallets from "./components/wallets";
import AppNavbar from "./components/appBar";
import styled from "styled-components";

const AppContainer = styled.div`
  max-width: 70%;
  margin: auto;
  background-color: #ffffff;
  padding: 0rem 2rem;
`;
function App() {
  return (
    <AppContainer>
      <AppNavbar />
      <Wallets />
    </AppContainer>
  );
}

export default App;
