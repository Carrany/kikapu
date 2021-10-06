import { routes } from "./routes";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "_helpers/history";
import "./App.css";

function App() {
  return (
    <Router history={history}>
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            render={(props) => <route.component {...props} />}
            exact={route.exact}
          />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
