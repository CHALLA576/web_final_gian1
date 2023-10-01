import React from 'react';
import { createRoot } from 'react-dom/client'; // Note the change in the import here
import App from './App';

const root = document.getElementById('root');
const reactRoot = createRoot(root);
reactRoot.render(<App />);