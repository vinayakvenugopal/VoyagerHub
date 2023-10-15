import React from "react";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import './InputValidationForAuth.css'


function InputValidationForAuth({ label, value, onChange, type, placeholder, error }) {
  return (
    <div className="col-12">
    {error &&
    <motion.div
        initial={{ opacity: 0, y: -10 }} // Initial animation state
        animate={{ opacity: error ? 1 : 0, y: error ? 0 : -10 }} // Animate the visibility
        transition={{ duration: 0.3 }} // Animation duration
        className={`error-message ${error ? "visible" : ""}`}
    >
        {error}
    </motion.div>}
      <div className="form-input ">
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
        <label className="lh-1 text-14 text-light-1">{label}</label>

        {/* Add animation to error message */}
       
      </div>
    </div>
  );
}

export default InputValidationForAuth;
