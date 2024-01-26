import InputField from "./InputField";

const Countdown = ({ countdown }) => (
    <div className="container">
        <h1>{countdown} DAYS LEFT UNTIL YOUR NEXT BIRTHDAY 🎂🎉</h1>
        <InputField
            label=""
            id="LogoutBtn"
            type="button"
            name="submitBtn"
            value="Logout"
            onClick={()=> window.location.href = "index.html"} />
    </div>
);
  
  export default Countdown;