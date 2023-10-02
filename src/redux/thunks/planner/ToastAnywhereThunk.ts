
import { Dispatch } from "redux";
import { ManagedElement } from "../../../interfaces/functionalInterfaces";
import { resetState, setToastParameters } from "../../slices/planner/ToastAnywhereSlice";


export const setReplicateToastThunk =
  (elementInfo: ManagedElement) => async (dispatch: Dispatch) => {

      dispatch(setToastParameters(elementInfo));
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);

  };

