// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from "./routes";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
function App() {
  return (
      <div className="app-container">
      <Header />
      <main className="main-content">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
