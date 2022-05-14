import SavedContainer from "./SavedContainer";
import { connect } from "react-redux";
import { getFavs } from "./../../../redux/usersSlice";

function mapStateToProps(state) {
  return { rooms: state.roomsReducer.favs };
}
function mapDispatchToProps(dispatch) {
  return {
    getFavs: () => dispatch(getFavs()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedContainer);
