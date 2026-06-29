import React, { useEffect, useState } from 'react';
import "./courseDescription.css";
import { useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
import { server } from "../../config";
import { UserData } from '../../context/User';
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
    const params = useParams();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData()

    const { fetchUser } = UserData()
    useEffect(() => {
        fetchCourse(params.id);
    }, [])

    const checkOutHandler = async () => {
        const token = localStorage.getItem("token")
        setLoading(true)

        const { data: { order } } = await axios.post(`${server}/api/course/checkout/${params.id}`, {}, {
            headers: {
                token,
            }
        }
        )

        const options = {
            "key": "rzp_test_T6eVC83ZOa9UEV",
            "amount": order.id,
            "currency": "INR",
            "name": "Lernix",
            "description": "Learn With Us!",
            "order_id": order.id,

            handler: async function (response) {
                const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

                try {
                    const { data } = await axios.post(`${server}/api/verification/${params.id}`, {
                        razorpay_order_id,
                        razorpay_payment_id,
                        razorpay_signature
                    },
                        {
                            headers: {
                                token,
                            }
                        }

                    )

                    await fetchUser();
                    await fetchCourses();
                    await fetchMyCourse();
                    toast.success(data.message);
                    setLoading(false)
                    navigate(`/payment-success/${razorpay_payment_id}`)
                } catch (error) {
                    toast.error(error.response.data.message);
                    setLoading(false)
                }
            },
            theme: {
                color: "#8a4b8a",
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open()
    };

    return (
        <>
            {
                loading ? <Loading /> : <>
                    {course && <div className="course-description">
                        <div className="course-header">
                            <img src={`${server}/${course.image}`} alt="" className="course-image" />
                            <div className="course-info">
                                <h2>{course.title}</h2>
                                <p>Instructor: {course.createdBy}</p>
                                <p>Duration: {course.duration} weeks</p>
                            </div>

                        <p>{course.description}</p>

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
                                    <button onClick={checkOutHandler} className="common-btn">Buy Now</button>
                                )
                        }
                    </div>}
                </>
            }
        </>
    );
}

export default CourseDescription