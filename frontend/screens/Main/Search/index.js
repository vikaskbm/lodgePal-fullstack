import { connect } from "react-redux";
import SearchContainer from "./SearchContainer";

function mapStateToProps(state) {
  return { token: state.userReducer.token };
}

export default connect(mapStateToProps)(SearchContainer);
