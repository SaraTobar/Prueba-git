import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Admin from './pages/admin/Index';
import Login from './pages/Login';
import Ventas from './pages/admin/Ventas';
import crearVenta from './pages/admin/Crear-venta';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={["/admin", "/admin/ventas", "/admin/crear-venta"]}>
            <Switch>
              <Route path="/admin/crear-venta">
                <Admin>
                  <crearVenta />
                </Admin>
              </Route>
              <Route path="/admin/ventas">
                <Admin>
                  <Ventas />
                </Admin>
              </Route>
              <Route path="/admin">
                <Admin>
                  <div>Admin Main</div>
                </Admin>
              </Route>
            </Switch>
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div >
  );
}

export default App;
