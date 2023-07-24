import "./App.css";
import Button from '@mui/material/Button';

function App() {
  const handleClick = async () => {
    const response = await fetch("/api/wallets");
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClick}>click me</Button>
    </>
  );
}

export default App;
