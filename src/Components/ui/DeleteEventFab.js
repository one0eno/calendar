import { useDispatch } from "react-redux";
import { startEventDeleted } from "../../actions/events";

import Swal from "sweetalert2";

export default function DeleteEventFab() {
  const dispatcth = useDispatch();

  //const { activeEvent } =  useSelector (state => state)

  const handleDeleteFab = () => {
    Swal.fire({
      title: "Esta usted seguro?",
      text: "El evento se va a eliminar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar evento!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatcth(startEventDeleted());
        Swal.fire("Eliminado!", "El evento ha sido eliminado", "success");
      }
    });
  };

  return (
    <>
      <button className="btn btn-danger fabs-danger" onClick={handleDeleteFab}>
        <i className="fas fa-trash"></i>
        <span>Borrar</span>
      </button>
    </>
  );
}
