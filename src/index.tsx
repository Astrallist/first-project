import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app';
import './styles.css';

import { Provider } from 'react-redux';
import { store } from './services/store';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<StrictMode>
    <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <div id="react-modals"></div>
      <App />
      </DndProvider>
    </Provider>
  </StrictMode>
);
