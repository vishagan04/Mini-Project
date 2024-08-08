import './App.css';

import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Login from "./Login"
import Dashboard from './Dashboard';
import Register from './Register';

function App() {
  return (
  <div className="App">
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
    
  </div>
  );
}

export default App;
