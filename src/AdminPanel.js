import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import StarRatingDisplay from "./StarRatingDisplay";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const AdminPanel = () => {
    const token = localStorage.getItem('jwtToken');
    const [activeTab, setActiveTab] = useState('all');
    const [isPending, setIsPending] = useState(false);

    const [pendingCourses, setPendingCourses] = useState([]);
    const [pendingReviews, setPendingReviews] = useState([]);

    const {data: courses, isPendingCourse, error} = useFetch('http://localhost:8080/api/courses', token);
    const {data: reviews, isPendingReviews, errorReviews} = useFetch('http://localhost:8080/api/reviews', token);

    const history = useHistory();

    useEffect(() => {
        if (courses) {
          setPendingCourses(courses.filter(course => course.courseUploadStatus === "PENDING"));
        }
      }, [courses]);
      
    useEffect(() => {
        if (reviews) {
          setPendingReviews(reviews.filter(review => review.reviewUploadStatus === "PENDING"));
        }
    }, [reviews]);

    let filteredCourses;
    let filteredReviews;

    if (courses) {
        filteredCourses = courses.filter(course => course.courseUploadStatus === "PENDING");
    }

    if (reviews) {
        filteredReviews = reviews.filter(review => review.reviewUploadStatus === "PENDING");
    }

    console.log(filteredCourses);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleApproveCourse = (courseId) => {
        setIsPending(true);
    
        fetch(`http://localhost:8080/api/admin/courses/${courseId}/approve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Approving course failed');
                }
                setPendingCourses(prevCourses => prevCourses.filter(course => course.courseId !== courseId));
                setIsPending(false);
                history.push(`/home`);
            })
            .catch(error => {
                console.error('Error approving course:', error);
                setIsPending(false);
            });
    };
    
    const handleDenyCourse = (courseId) => {
        setIsPending(true);
    
        fetch(`http://localhost:8080/api/admin/courses/${courseId}/deny`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Denying course failed');
                }
                setPendingCourses(prevCourses => prevCourses.filter(course => course.courseId !== courseId));
                setIsPending(false);
                history.push(`/home`);
            })
            .catch(() => {
                console.error('Error denying course:', error);
                setIsPending(false);
            });
    };
    
    const handleApproveReview = (reviewId) => {
        setIsPending(true);
    
        fetch(`http://localhost:8080/api/admin/reviews/${reviewId}/approve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Approving reviews failed');
            }
            setPendingReviews(prevReviews => prevReviews.filter(review => review.reviewId !== reviewId));
            setIsPending(false);
            history.push(`/home`);
        })
        .catch(error => {
            console.error('Error approving review:', error);
            setIsPending(false);
        });
    };
    
    const handleDenyReview = (reviewId) => {
        setIsPending(true);
    
        fetch(`http://localhost:8080/api/admin/reviews/${reviewId}/deny`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Deniyng reviews failed');
            }
            setPendingReviews(prevReviews => prevReviews.filter(review => review.reviewId !== reviewId));
            setIsPending(false);
            history.push(`/home`);
        })
        .catch(error => {
            console.error('Error denying review:', error);
            setIsPending(false);
        });
    };    

    return (
        <div className="admin-panel">
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <button
                    style={{ marginRight: '10px', padding: '10px', background: activeTab === 'all' ? '#f1356d' : '#2c3e50', color: 'white', border: 'none', cursor: 'pointer' }}
                    onClick={() => handleTabChange('all')}
                >
                    All
                </button>
                <button
                    style={{ marginRight: '10px', padding: '10px', background: activeTab === 'courses' ? '#f1356d' : '#2c3e50', color: 'white', border: 'none', cursor: 'pointer' }}
                    onClick={() => handleTabChange('courses')}
                >
                    Courses
                </button>
                <button
                    style={{ padding: '10px', background: activeTab === 'reviews' ? '#f1356d' : '#2c3e50', color: 'white', border: 'none', cursor: 'pointer' }}
                    onClick={() => handleTabChange('reviews')}
                >
                    Reviews
                </button>
            </div>
            {activeTab === 'all' && <div style={{ marginTop: '20px' }}>
                {pendingCourses && pendingCourses.map((course) => (
                    <Link to={`/courses/${course.courseId}`}>
                        <div className="course-review-admin" key={course.id}>
                            <div className="course-review-admin-left">
                                <h3>{course.courseName}:</h3>
                                <p className='review-desc-admin'>"{course.description}"</p>
                                <p className='teacher-name'>Teacher: {course.teacher.firstName} {course.teacher.lastName}</p>
                            </div>
                            <div className="course-review-admin-right">
                                <button className="button-approve" onClick={() => handleApproveCourse(course.courseId)}>Approve</button>
                                <button className="button-deny" onClick={() => handleDenyCourse(course.courseId)}>Deny</button>
                            </div>
                        </div>
                    </Link>
                ))}
                {pendingReviews && pendingReviews.map((review) => (
                    <div className="course-review-admin" key={review.id}>
                        <div className="course-review-admin-left">
                            <h3>{review.author}:</h3>
                            <p className='review-desc-admin'>"{review.description}"</p>
                            <StarRatingDisplay rating={review.score}/>
                            <p className='course-name'>Course: {review.course.courseName}</p>
                        </div>
                        <div className="course-review-admin-right">
                            <button className="button-approve" onClick={() => handleApproveReview(review.reviewId)}>Approve</button>
                            <button className="button-deny" onClick={() => handleDenyReview(review.reviewId)}>Deny</button>
                        </div>
                    </div>
                ))}
                {pendingCourses.length === 0 && pendingReviews.length === 0 && <div className="no-content-admin">
                    Currently there are no courses or reviews pending for approval.
                </div>}
            </div>}
            {activeTab === 'courses' && <div style={{ marginTop: '20px' }}>
                {pendingCourses && pendingCourses.map((course) => (
                    <Link to={`/courses/${course.courseId}`}>
                        <div className="course-review-admin" key={course.id}>
                            <div className="course-review-admin-left">
                                <h3>{course.courseName}:</h3>
                                <p className='review-desc-admin'>"{course.description}"</p>
                                <p className='teacher-name'>Teacher: {course.teacher.firstName} {course.teacher.lastName}</p>
                            </div>
                            <div className="course-review-admin-right">
                                <button className="button-approve" onClick={() => handleApproveCourse(course.courseId)}>Approve</button>
                                <button className="button-deny" onClick={() => handleDenyCourse(course.courseId)}>Deny</button>
                            </div>
                        </div>
                    </Link>
                ))}
                {pendingCourses.length === 0 && <div className="no-content-admin">
                    Currently there are no courses pending for approval.
                </div>}
            </div>}
            {activeTab === 'reviews' && <div style={{ marginTop: '20px' }}>
                {pendingReviews && pendingReviews.map((review) => (
                    <div className="course-review-admin" key={review.id}>
                        <div className="course-review-admin-left">
                            <h3>{review.author}:</h3>
                            <p className='review-desc-admin'>"{review.description}"</p>
                            <StarRatingDisplay rating={review.score}/>
                            <p className='course-name'>Course: {review.course.courseName}</p>
                        </div>
                        <div className="course-review-admin-right">
                            <button className="button-approve" onClick={() => handleApproveReview(review.reviewId)}>Approve</button>
                            <button className="button-deny" onClick={() => handleDenyReview(review.reviewId)}>Deny</button>
                        </div>
                    </div>
                ))}
                {pendingReviews.length === 0 && <div className="no-content-admin">
                    Currently there are no reviews pending for approval.
                </div>}
            </div>}
        </div>
  );
}
 
export default AdminPanel;