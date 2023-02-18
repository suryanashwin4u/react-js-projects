import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CoinsPage from "./pages/CoinsPage";

function App() {
	return (
		<BrowserRouter basename='crypto-tracker'>
			<div className='text-white min-h-screen relative'>
				<Header />
				<Route path='/' exact component={HomePage} />
				<Route path='/coins/:id' component={CoinsPage} />
				<div className="bg-[url('../public/banner.jpg')] -z-10 w-full opacity-20 absolute top-0 h-full"></div>
			</div>
		</BrowserRouter>
	);
}

export default App;
