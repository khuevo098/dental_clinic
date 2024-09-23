import Routers from '../router/Router';
import '../styles/global.scss';


import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
    
  );
}

export default App;
