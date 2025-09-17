import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";


const PtotectedRoutes = ({ component }) => {

    const user = useUser();

    const navigate = useNavigate();
    
    if (!user?.identities[0].user_id) {
      navigate("/signin");
    }
    
    return component
}


export default PtotectedRoutes