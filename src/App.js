import './App.css';
import City from './components/City';
import Weather from './components/Weather';
import { WeatherProvider } from './context/WeatherContext';

function App() { 
  return (
    <div className="App">
    <WeatherProvider>
      <City/>
      <Weather />
    </WeatherProvider>
    </div>
  );
}

export default App;
