import Mikrofrontend from './Mikrofrontend';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('maincontent') as HTMLElement);
root.render(<Mikrofrontend />);
