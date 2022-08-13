import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './pages/home/HomePage';
import PrivacyPage from './pages/documents/privacy';
import ContactPage from './pages/contact/contact';
import CopyrightPage from './pages/documents/copyright';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App/>} />
				<Route path="/docs/privacy" element={<PrivacyPage/>} />
				<Route path="/docs/contact" element={<ContactPage/>} />
				<Route path="/docs/copyright" element={<CopyrightPage/>} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
