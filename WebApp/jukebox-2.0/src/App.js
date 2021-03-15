import './App.css';
import Testcomponentfun from './components/testcomponentfunctional/testcomponentfunction'
import Testcomponentclass from './components/testcomponentclass/testcomponentclass'

function App() {
  return (
    <div className="App">
      <Testcomponentfun message="yo"/>
      <Testcomponentclass componenttype="class"/>
      <p> Hello world </p>
    </div>
  );
}

export default App;
