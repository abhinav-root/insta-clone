import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/messages" component={Messages} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/profile" component={Profile} />
        <Route exact path="/accounts/login" component={Login} />
        <Route path="/accounts/signup" component={Signup} />
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
