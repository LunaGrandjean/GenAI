import "../App.css"; 
import { FaUserPlus, FaSignInAlt, FaQuestionCircle } from "react-icons/fa";

export default function HowItWorks() {
  return (
    <div className="how-it-works-wrapper">
      <h2 className="hiw-heading">How Griffith AI Works</h2>
      <div className="hiw-steps">
        {/* Step 1 */}
        <div className="hiw-step">
          <FaUserPlus className="hiw-icon" />
          <h3 className="hiw-step-title">1. Register & Explore</h3>
          <p>Create your account and start exploring the Griffith College website with ease.</p>
        </div>
        
        {/* Step 2 */}
        <div className="hiw-step">
          <FaSignInAlt className="hiw-icon" />
          <h3 className="hiw-step-title">2. Log In</h3>
          <p>Log in anytime to access your account and saved conversations.</p>
        </div>

        {/* Step 3 */}
        <div className="hiw-step">
          <FaQuestionCircle className="hiw-icon" />
          <h3 className="hiw-step-title">3. Start Asking Questions</h3>
          <p>Start asking anything about Griffith College and get instant, reliable answers.</p>
        </div>
      </div>
    </div>
  );
}
