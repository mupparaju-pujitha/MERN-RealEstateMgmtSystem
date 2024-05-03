import React, { useState } from "react";
import "../styles/Login.scss"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const user = useSelector(state => state.user); // Assuming you have a user state in Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update profile details if password is provided
      if (password && password === confirmPassword) {
        const updateResponse = await fetch("http://localhost:3001/api/user/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ password })
        });

        if (updateResponse.ok) {
          console.log("Password updated successfully!");
        } else {
          console.error("Failed to update password");
        }
      } else {
        console.error("Passwords do not match");
      }
    } catch (err) {
      console.log("Password update failed", err.message);
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={user.firstName + " " + user.lastName}
            readOnly // Read-only mode
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            readOnly // Read-only mode
          />
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">UPDATE PASSWORD</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Login.scss";

// const ProfilePage = () => {
//   const [formData, setFormData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [passwordMatch, setPasswordMatch] = useState(true);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Check if new password and confirm password match
//       if (formData.newPassword !== formData.confirmPassword) {
//         setPasswordMatch(false);
//         return;
//       }

//       // Send request to change password
//       const response = await fetch("http://localhost:3001/users/my-profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({
//           currentPassword: formData.currentPassword,
//           newPassword: formData.newPassword,
//         }),
//       });

//       if (response.ok) {
//         navigate("/");
//       } else {
//         const errorMessage = await response.text();
//         console.error("Failed to change password");
//       }
//     } catch (err) {
//       console.log("Password change failed", err.message);
//     }
//   };

//   return (
//     <div className="login">
//       <div className="login_content">
//         <form className="login_content_form" onSubmit={handleSubmit}>
//           <input
//             placeholder="Current Password"
//             name="currentPassword"
//             type="password"
//             value={formData.currentPassword}
//             onChange={handleChange}
//             required
//           />
//           <input
//             placeholder="New Password"
//             name="newPassword"
//             type="password"
//             value={formData.newPassword}
//             onChange={handleChange}
//             required
//           />
//           <input
//             placeholder="Confirm New Password"
//             name="confirmPassword"
//             type="password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />

//           {!passwordMatch && (
//             <p style={{ color: "red" }}>New passwords do not match!</p>
//           )}

//           <button type="submit">CHANGE PASSWORD</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;


