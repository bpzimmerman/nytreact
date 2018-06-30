import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Articles from "./pages/Articles"
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import { Input, FormBtn } from "./components/Form";

const App = () => (
  <Router>
    <div>
      <Nav />
      <div className="wrapper">
        <Sidebar>
          <form>
            <Input
              type="text"
              placeholder="Article Topic"
              id="topic"
            />
            <Input
              placeholder="Start Date (required)"
              id="startDate"
            />
            <Input
              placeholder="End Date (required)"
              id="endDate"
            />
            <FormBtn>Submit</FormBtn>
          </form>
        </Sidebar>
        <div id="content">
          <Switch>
            <Route exact path="/" component={Articles} />
          </Switch>
        </div>
      </div>
    </div>
  </Router>
);

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

export default App;
