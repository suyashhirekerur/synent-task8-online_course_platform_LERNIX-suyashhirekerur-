import "./coursecard.css";
import { UserData } from "../../context/User"
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { CourseData } from '../../context/CourseContext';
import axios from 'axios';
import { server } from '../../main';
const CourseCard = ({ course }) => {
  const navigate = useNavigate()
  const { user, isAuth } = UserData()

  const { fetchCourses } = CourseData()

  const deleteHandler = async (id) => {
    if (confirm("Are you sure want to delete this course?")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.success(error.response.data.message)
      }
    }
  };

  return (
    <div className="course-card">
      <img src={`${server}/${course.image}`} alt="" className="course-image" />
      <h3>{course.title}</h3>
      <p>Instructor - {course.createdBy}</p>
      <p>Duration - {course.duration} weeks</p>
      <p>Price - ₹{course.price}</p>
      {
        isAuth ? (<>
          {user && user.role !== "admin" && user.mainrole !== "superadmin" ? (
            <>
              {
                user.subscription?.includes(course._id) ? (
                  <button onClick={() => navigate(`/course/study/${course._id}`)} className="common-btn">Study</button>
                ) : (
                  <button onClick={() => navigate(`/course/${course._id}`)} className="common-btn">Get Started</button>
                )
              }</>
          ) : (
            < button onClick={() => navigate(`/course/study/${course._id}`)} className="common-btn">Study</button>
          )}

        </>

        ) : (
          <button onClick={() => navigate("/login")} className="common-btn">Get Started</button>
        )
      }

      <br />

      {
        user && (user.role === "admin" || user.mainrole === "superadmin") && (
          <button
            onClick={() => deleteHandler(course._id)}
            className="common-btn"
            style={{ background: "red" }}
          >
            Delete
          </button>
        )
      }
    </div >
  );
};

export default CourseCard;