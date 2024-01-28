import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/hooks/useAuth";

export function useNotFoundController() {
  const { signedIn } = useAuth();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(signedIn ? "/" : '/login', {
      replace: true
    })
  }

  return { handleButtonClick };
}