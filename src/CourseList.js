import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

const CourseList = ({courses, title}) => {
    const token = localStorage.getItem('jwtToken');
    const isTeacher = localStorage.getItem('isTeacher');
    const [courseNameText, setCourseNameText] = useState('');
    const [courseType, setCourseType] = useState(null);
    const [courseCategory, setCourseCategory] = useState(null);
    const [isPendingSearch, setIsPendingSearch] = useState(false);
    const [coursesToShow, setCoursesToShow] = useState([]);


    useEffect(() => {
        if (courses) {
            setCoursesToShow(courses);
        }
    }, [courses]);

    const handleSearch = (e) => {
        e.preventDefault();

        const searchQuery = encodeURIComponent(courseNameText);

        setIsPendingSearch(true);

        fetch(`http://localhost:8080/api/courses/title?courseName=${searchQuery}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Search failed");
                }
                return response.json();
            })
            .then(data => {
                setIsPendingSearch(false);
                setCoursesToShow(data);
            })
            .catch(error => {
                setIsPendingSearch(false);
            });
    }

    const handleFilter = (e) => {
        e.preventDefault();

        const searchCategoryQuery = encodeURIComponent(courseCategory);
        const searchTypeQuery = encodeURIComponent(courseType);
    
        let newApiUrlFilter = '';
    
        if (courseCategory === null) {
          newApiUrlFilter = `http://localhost:8080/api/courses/filter?type=${searchTypeQuery}`;
        } else if (courseType === null) {
          newApiUrlFilter = `http://localhost:8080/api/courses/filter?category=${searchCategoryQuery}`;
        } else {
          newApiUrlFilter = `http://localhost:8080/api/courses/filter?category=${searchCategoryQuery}&type=${searchTypeQuery}`;
        }

        setIsPendingSearch(true);

        fetch(newApiUrlFilter, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Search failed");
                }
                return response.json();
            })
            .then(data => {
                setIsPendingSearch(false);
                setCoursesToShow(data);
            })
            .catch(error => {
                setIsPendingSearch(false);
            });
    }

    return (
        <div className="course-list">
            <h2>{title}</h2>
            {!isTeacher && <div className="filter-courses">
                <div className="search-courses">
                    <input
                        type="text"
                        value={courseNameText}
                        onChange={(e) => setCourseNameText(e.target.value)}
                        placeholder="Search by name" 
                    />
                    <FontAwesomeIcon onClick={handleSearch} icon={faSearch} />
                </div>
                <div className="search-courses-filter">
                    <select
                        value={courseType}
                        onChange={(e) => setCourseType(e.target.value)}
                    >
                        <option value="" disabled hidden>Type</option>
                        <option value="INDIVIDUAL">Individual course</option>
                        <option value="GROUP">Group course</option>
                    </select>
                    <select
                        value={courseCategory}
                        onChange={(e) => setCourseCategory(e.target.value)}
                    >
                        <option value="" disabled hidden>Category</option>
                        <option value="PROGRAMMING_LANGUAGES">Programming languages</option>
                        <option value="WEB_DEVELOPMENT">Web development</option>
                        <option value="DATA_SCIENCE">Data science</option>
                        <option value="SOFTWARE_ENGINEERING">Software engineering</option>
                        <option value="SOFTWARE_TESTING">Software testing</option>
                        <option value="LANGUAGES">Languages</option>
                        <option value="MATHEMATICS">Mathematics</option>
                        <option value="OTHER">Other</option>
                    </select>
                    <FontAwesomeIcon onClick={handleFilter} icon={faFilter} />
                </div>
            </div>}
            <div className="courses">
            {coursesToShow.map((course) => (
                <div className="course-preview" key={course.id}>
                    <Link to={`/courses/${course.courseId}`}>
                        <p className="course-type">{course.courseType} COURSE</p>
                        <h2>{course.courseName}</h2>
                        <p className="course-teacher">Teacher: {course.teacher.firstName} {course.teacher.lastName}</p>
                        <p className="course-price-small">{course.price}MKD</p>
                    </Link>
                </div>
            ))}
            </div>
            {isTeacher && <div className="center-button-container">
                <Link to="/addCourse"><button id='add-course'>Add new course</button></Link>
            </div>}
        </div>
    );
}
 
export default CourseList;