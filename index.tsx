
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const HealthCheck: React.FC = () => {
  const message = `App is running ${new Date().toString()}`;
  return (
    <pre style={{ color: 'white', fontFamily: 'monospace', margin: 0, padding: '1em' }}>
      {message}
    </pre>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

if (window.location.pathname === '/health') {
  root.render(<HealthCheck />);
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
