import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaCrown } from "react-icons/fa6";
import { getRequest, baseurl, calculateAge } from "../utils/services";
import { AuthContext } from "../context/AuthContext";

const ProfileCard = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { user: currentUser } = useContext(AuthContext);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getRequest(`${baseurl}/users`);
        if (!response.error) {
          setUsers(response);
        }
      } catch (e) {
        console.error("Failed to fetch users", e);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filter out current user and same gender (simple logic for now)
  const filteredUsers = users.filter((u) => {
    if (!currentUser) return true; // Show all if not logged in
    if (u.id === currentUser.id) return false; // Exclude self
    if (currentUser.gender && u.gender && currentUser.gender === u.gender) return false; // Exclude same gender
    return true;
  });

  if (loading) {
    return <div className="p-4 text-center">Loading matches...</div>;
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>No matches found yet. Check back later!</p>
      </div>
    );
  }

  return (
    <main className="overflow-x-auto p-4">
      <div className="flex space-x-6 scrollbar-hide">
        {filteredUsers.map((user) => (
          <Link to={`/profiles/${user.id}`} key={user.id}>
            <div
              className={`${user.role === "premium"
                ? "bg-green-300 hover:bg-green-100 rounded-md hover:text-green-500"
                : "bg-gray-100 hover:bg-blue-100 rounded-md hover:text-blue-500"
                } flex flex-col items-center py-2 px-2 hover:scale-110 cursor-pointer transition-all duration-700 ease-in-out`}
              style={{ minWidth: "150px" }}
            >
              <img
                src={user.profileDp || "https://via.placeholder.com/150"}
                className="h-32 rounded-md object-cover w-32"
                alt={`${user.name}'s profile`}
              />
              <div className="flex flex-col items-center mt-2">
                {user.role === "premium" && (
                  <FaCrown className="text-green-500" />
                )}
                <span className="text-md font-semibold">{user.name || "User"}</span>
                <span className="text-xs">
                  {user.dob ? `${calculateAge(user.dob) || "N/A"} Yrs` : "N/A"}, {user.address || "Location"}
                </span>
                <span className="text-xs text-gray-500">
                  {user.job || "Occupation"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default ProfileCard;
