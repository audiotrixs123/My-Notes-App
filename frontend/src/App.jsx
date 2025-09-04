// import { useState, useEffect } from "react";
// import NotesApp from "./NotesApp";
// import AuthPage from "./AuthPage";

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   return (
//     <div>
//       {user ? (
//         <NotesApp user={user} setUser={setUser} />
//       ) : (
//         <AuthPage setUser={setUser} />
//       )}
//     </div>
//   );
// }

// export default App;
