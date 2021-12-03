import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../actions/ui";

export default function AddNewFab() {
  const dispatch = useDispatch();

  const handleNewFab = () => {
    dispatch(uiOpenModal());
  };

  return (
    <button className="btn btn-primary fabs" onClick={handleNewFab}>
      <i className="fas fa-plus"></i>
    </button>
  );
}
