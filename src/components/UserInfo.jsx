/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

function UserInfo({ user }) {
  return (
    <div>
      <h2>General info</h2>
      <b>Gender:</b> {user.gender}
      <br />
      <b>Email:</b> {user.email}
      <br />
      <b>Cellphone number:</b> {user.cell}
      <br />
      <b>Work phone number:</b> {user.phone}
      <br />
      <h2>Location</h2>
      <b>Country:</b> {user.location.country}
      <br />
      <b>City:</b> {user.location.city}
      <br />
      <b>Street:</b> {user.location.street.name} No.{" "}
      {user.location.street.number}
      <br />
      <br />
    </div>
  );
}

UserInfo.propTypes = {
  user: PropTypes.shape({
    gender: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		cell: PropTypes.number.isRequired,
		phone: PropTypes.number.isRequired
  }).isRequired,
};

export default UserInfo;
