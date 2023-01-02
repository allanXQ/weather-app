import { BrowserRouter, Route, Routes } from "react-router-dom";
import HourlyForecast from "./components/forecast/hourlyforecast";
import NotFound from "./components/notfound";
import Container from "./container";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="/:city/:day" element={<HourlyForecast />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
