import { Link, useLocation } from "react-router-dom";

function Navbar() {
   const location = useLocation();

   return ( 
      <div className="h-14 fixed top-0 left-0 right-0 flex items-center justify-between px-28 z-50 bg-black/50">
         <ul className="flex grow gap-4">
            <li>
               <Link to="/" className={`${(location.pathname != "/")? "opacity-60" : ""}`}>Homepage</Link>
            </li>
            <li>
               <Link to="/dashboard" className={`${(location.pathname != "/dashboard")? "opacity-60" : ""}`}>Dashboard</Link>
            </li>
         </ul>
      </div>
   );
}

export default Navbar;