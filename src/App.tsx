import React from 'react';
import Dashboard from './components/Dashboard';
import { DataProvider } from './context/DataContext';
import './App.css';

const App: React.FC = () => {
  return (
    <DataProvider>
      <div className="App">
        <header>
          <h1>Frontend Filter Optimization</h1>
        </header>
        <main>
          <Dashboard />
        </main>
      </div>
    </DataProvider>
  );
};

export default App;