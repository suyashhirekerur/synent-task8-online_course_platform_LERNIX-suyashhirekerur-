import { createContext, useContext } from "react"
import axios from "axios";

const CourseContext = createContext()

export const CourseContextProvider = ({ children }) => {
    const [courses, setCourses] = useState([])

    async function fetchCourses() {
        try {
            const { data } = await axios.get(`${server}/api/course/all`);

            setCourses(data.courses);
        } catch (error) {
            console.log(error);

        }

    }

    useEffect(()=>{
        fetchCourses();
    }, [])
    return <CourseContext.Provider value={{ courses, fetchCourses }}>
        {children}
    </CourseContext.Provider>;
};

export const CourseData = () => useContext(CourseContext);
