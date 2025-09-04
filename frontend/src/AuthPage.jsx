// //(Register/Login) 
// import { useState } from "react";
// import API from "./api";

// export default function AuthPage({ setUser }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [isRegister, setIsRegister] = useState(false);

//   const handleSubmit = async () => {
//     try {
//       const endpoint = isRegister ? "/auth/register" : "/auth/login";
//       const res = await API.post(endpoint, { username, password });

//       // Save token + user
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       setUser(res.data.user);
//     } catch (err) {
//       alert("❌ " + (err.response?.data?.error || "Something went wrong"));
//       console.error(err);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "auto", textAlign: "center", marginTop: 50 }}>
//       <h2>{isRegister ? "📝 Register" : "🔑 Login"}</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         style={{ display: "block", margin: "10px auto", padding: "8px", width: "90%" }}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         style={{ display: "block", margin: "10px auto", padding: "8px", width: "90%" }}
//       />
//       <button
//         onClick={handleSubmit}
//         style={{ padding: "8px 15px", marginTop: 10, background: "blue", color: "white", border: "none", borderRadius: 5 }}
//       >
//         {isRegister ? "Register" : "Login"}
//       </button>
//       <p
//         style={{ marginTop: 15, cursor: "pointer", color: "gray" }}
//         onClick={() => setIsRegister(!isRegister)}
//       >
//         {isRegister ? "Already have an account? Login" : "New user? Register"}
//       </p>
//     </div>
//   );
// }

// // localStorage.getItem("user")