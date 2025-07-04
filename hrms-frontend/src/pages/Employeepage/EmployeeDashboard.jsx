import ProfileCard from "../../components/ProfileCard";
import CheckInCard from "../../components/employee/CheckInCard.jsx";
import CalendarWidget from "../../components/CalendarWidget.jsx";
const EmployeeDashboard = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Profile Card */}
        <ProfileCard token={token} />

        {/* Check In Card */}
        <CheckInCard token={token} />

        {/* Calendar Widget */}
        <CalendarWidget token={token} />

        {/* Other widgets */}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
