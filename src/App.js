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
import MyBookings from './MyBookings';
import AddReview from './AddReview';
import MyReviews from './MyReviews';
import EditReview from './EditReview';

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
            <Route path="/bookings">
              <MyBookings/>
            </Route>
            <Route path="/addReview">
              <AddReview/>
            </Route>
            <Route exact path="/reviews">
              <MyReviews/>
            </Route>
            <Route path="/reviews/:id/edit">
              <EditReview/>
            </Route>
          </Switch>
        </div> 
      </div>
    </Router>
  );
}

export default App;