import React, { useEffect } from 'react'
import "./courseDescription.css";
import { useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { useNavigate } from 'react-router-dom';

const CourseDescription = ({ user }) => {
    const params = useParams();
    const navigate = useNavigate()

    const { fetchCourse, course } = CourseData()

    useEffect(() => {
        fetchCourse(params.id);
    }, [])

    return (
        <>
            {course && <div className="course-description">
                <div className="course-header">
                    <img src={`${server}/${course.image}`} alt="" className="course-image" />
                    <div className="course-info">
                        <h2>{course.title}</h2>
                        <p>Instructor: {course.createdBy}</p>
                        <p>Duration: {course.duration} weeks</p>
                    </div>

                </div>
                <p>Let's get Started with this course At ₹{course.price}</p>

                {
                    user && user.subscription.includes(course._id)
                        ?
                        (
                            <button onClick={() => navigate(`/course/study/${course._id}`)} className="common-btn">Study</button>
                        )
                        :
                        (
                            <button className="common-btn">Buy Now</button>
                        )
                }
            </div>}
        </>
    );
}

export default CourseDescription