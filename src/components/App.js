import Dashboard from "../components/Dashboard";
import "../css/master.css";
import ThemeManager from "../context/ThemeContext";
function App() {
    return (
        <ThemeManager>
            <div className="App">
                <Dashboard />
            </div>
        </ThemeManager>
    );
}

export default App;
