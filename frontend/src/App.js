import Navigation from "./components/Navbar.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Main from "./Main.js";

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <Main></Main>
    </div>
  );
}

export default App;
