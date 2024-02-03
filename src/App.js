import Navbar from './Navbar';
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CourseDetails from './CourseDetails';
import TeacherDetails from './TeacherDetails';
import Register from './Register';
import Login from './Login';
import Welcome from './Welcome';
import EditProfile from './EditProfile';
import ViewProfile from './ViewProfile';
import EditCourse from './EditCourse';
import AddCourse from './AddCourse';
import MyEnrollments from './MyEnrollments';
import AddReview from './AddReview';
import CourseReviews from './CourseReviews';
import CourseEnrollments from './CourseEnrollments';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <div className="content">
          <Switch>
          <Route exact path="/">
              <Welcome/>
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/home">
              <Home/>
            </Route>
            <Route exact path="/courses/:id">
              <CourseDetails/>
            </Route>
            <Route path="/courses/:id/edit">
              <EditCourse/>
            </Route>
            <Route path="/addCourse">
              <AddCourse/>
            </Route>
            <Route path="/teachers/:id">
              <TeacherDetails/>
            </Route>
            <Route exact path="/profile">
              <ViewProfile/>
            </Route>
            <Route path="/profile/edit">
              <EditProfile/>
            </Route>
            <Route path="/enrollments">
              <MyEnrollments/>
            </Route>
            <Route path="/courseEnrollments/:id">
              <CourseEnrollments/>
            </Route>
            <Route path="/addReview">
              <AddReview/>
            </Route>
            <Route path="/reviews/:id">
              <CourseReviews/>
            </Route>
          </Switch>
        </div> 
      </div>
    </Router>
  );
}

export default App;