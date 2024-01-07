import Navbar from './Navbar';
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CourseDetails from './CourseDetails';
import TeacherDetails from './TeacherDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/courses/:id">
              <CourseDetails/>
            </Route>
            <Route path="/teachers/:id">
              <TeacherDetails/>
            </Route>
          </Switch>
        </div> 
      </div>
    </Router>
  );
}

export default App;