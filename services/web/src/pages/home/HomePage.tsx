import { Link } from 'react-router-dom';

function App() {
	return (
		<div style={{
			paddingLeft: 10,
			paddingRight: 10,
		}}>
			<div>
				<h2>Welcome to Eventus project</h2>
			</div>
			<ul>
				<li><Link to='/docs/privacy'>Privacy page</Link></li>
				<li><Link to='/docs/contact'>Contact</Link></li>
				<li><Link to='/docs/Copyright'>Copyright</Link></li>
			</ul>
		</div>
	);
}

export default App;
