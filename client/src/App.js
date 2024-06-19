import logo from './logo.svg';
import './App.css';
import Index from './components/Assignment1/index'
import Home from './components/Assignment1/components/Home';
import DataTable from './components/Assignment1/components/DataTable';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Assignment1" element={<Index />} />
        <Route path="/assignment-1" element={<Home />} />
        <Route path="/data-table" element={<DataTable />} />
      </Routes>
    </Router>
  );
}

export default App;
