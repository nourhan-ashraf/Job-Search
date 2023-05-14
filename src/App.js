import './App.css';
import JobPage from './pages/JobPage';
import EachJob from './pages/EachJob';
import {
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<JobPage />} />
        <Route exact path="/job/:id" element={<EachJob />} />



      </Routes>
    </>
  );
}

export default App;
