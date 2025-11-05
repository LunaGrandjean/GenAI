import "../App.css"; // Import global styles
import luna from "../assets/luna.jpg"; // Team member image
import { FaGithub } from "react-icons/fa"; // GitHub icon
import emailjs from "@emailjs/browser"; // Email sending service
import { useState } from "react"; // React hook for managing state

// Array of team members with their details
const teamMembers = [
  {
    name: "Luna Grandjean",
    role: "luna.grandjean@student.griffith.ie",
    image: luna,
    bio: "20-year-old French student currently studying Computer Science at Griffith College. Passionate about technology, innovation, and creating impactful digital experiences.",
    github: "https://github.com/LunaGrandjean",
  },
];

// Array of campus details with map embed links
const campuses = [
  {
    name: "Dublin Main Campus",
    address: "South Circular Road, Dublin 8",
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.781567775462!2d-6.2785764!3d53.331376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670c1833b915c7%3A0x4f83acae16f5062e!2sGriffith%20College%20Dublin!5e0!3m2!1sen!2sie!4v1716791903435!5m2!1sen!2sie",
  },
  {
    name: "Limerick Campus",
    address: "O'Connell Avenue, Limerick",
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.781567775462!2d-8.6326533!3d52.6582407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485b5c6f6cf6c13d%3A0xd8aa43fdbccad897!2sGriffith%20College%20Limerick!5e0!3m2!1sen!2sie!4v1716791968311!5m2!1sen!2sie",
  },
  {
    name: "Cork Campus",
    address: "Wellington Road, Cork",
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.781567775462!2d-8.4612759!3d51.9032607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4844901a45d86009%3A0x6accbdef49adec91!2sGriffith%20College%20Cork!5e0!3m2!1sen!2sie!4v1716792026845!5m2!1sen!2sie",
  },
];

// AboutUs component definition
const AboutUs = () => {
  // State hooks for contact form fields
  const [selectedRecipient, setSelectedRecipient] = useState("luna.grandjean@student.griffith.ie");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    // EmailJS configuration
    const serviceID = "sservice_jb2yslr";   // EmailJS service ID
    const templateID = "template_zvkg1tv"; // EmailJS template ID
    const publicKey = "wGjO7lySlXyHjpdnc"; // EmailJS public key

    // Template parameters passed to EmailJS
    const templateParams = {
      to_email: selectedRecipient,
      from_name: name,
      reply_to: email,
      message: message,
    };

    // Send the email using EmailJS
    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        alert("Message sent!");
        // Reset form fields after successful send
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((err) => {
        alert("Something went wrong");
        console.error(err);
      });
  };

  return (
    <div className="about-us-wrapper">

      {/* Our Team Section */}
      <div className="section-box">
        <h2 className="section-heading">Creator's info</h2>
        <div className="team-grid">
          {/* Loop through team members and display their cards */}
          {teamMembers.map((member, idx) => (
            <div key={idx} className="team-member">
              <img src={member.image} alt={member.name} className="team-photo" />
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="bio-text">{member.bio}</p>
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="github-link">
                <FaGithub style={{ marginRight: "6px" }} /> GitHub
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Our Locations Section */}
      <div className="section-box">
        <h2 className="section-heading">Our Locations</h2>
        <div className="campus-grid">
          {/* Loop through campus details and embed Google Maps */}
          {campuses.map((campus, idx) => (
            <div key={idx} className="campus-card">
              <h4>{campus.name}</h4>
              <p>{campus.address}</p>
              <iframe
                src={campus.mapLink}
                title={campus.name}
                width="100%"
                height="150"
                style={{ border: 0, borderRadius: "8px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Our Team Section */}
      <div className="section-box">
        <h2 className="section-heading">Contact Our Team</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          {/* Dropdown for selecting recipient */}
          <select value={selectedRecipient} onChange={(e) => setSelectedRecipient(e.target.value)} required>
            <option value="luna.grandjean@student.griffith.ie">Luna</option>
            <option value="maia.jouenne@student.griffith.ie">Maia</option>
          </select>
          {/* Input fields for name and email */}
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Textarea for the message */}
          <textarea
            placeholder="Enter your message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          {/* Submit button */}
          <button type="submit">Send Message</button>
        </form>
      </div>

    </div>
  );
};

export default AboutUs;
