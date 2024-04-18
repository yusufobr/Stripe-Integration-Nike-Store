import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/checkout';
import SuccsesPayment from './pages/SuccsesPayment';
import FaildPayment from './pages/FaildPayment';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Home />} />
        <Route path="/success" element={<SuccsesPayment />} />
        <Route path="/cancel" element={<FaildPayment />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
