import SavedContainer from "./SavedContainer";
import { connect } from "react-redux";
import { getFavs } from "./../../../redux/usersSlice";

function mapDispatchToProps(dispatch) {
  return {
    getFavs: () => dispatch(getFavs()),
  };
}

export default connect(null, mapDispatchToProps)(SavedContainer);
