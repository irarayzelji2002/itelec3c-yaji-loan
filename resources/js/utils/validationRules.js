export const validateDateIsBeforeToday = (dateString) => {
  const inputDate = new Date(dateString); // Parse input date
  const today = new Date(); // Get today's date

  // Remove time components for accurate comparison
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return inputDate < today; // Returns true if inputDate is before today
};

export const validateStep1 = (data) => {
  const errors = {};

  // Basic Information validation
  if (!data.first_name) errors.first_name = "First name is required";
  if (!data.last_name) errors.last_name = "Last name is required";
  if (!data.gender) errors.gender = "Gender is required";
  if (!data.birth_date) errors.birth_date = "Birth date is required";
  else if (!validateDateIsBeforeToday(data.birth_date))
    errors.birth_date = "The date must be a date before today.";
  if (!data.nationality) errors.nationality = "Nationality is required";

  // Contact Information validation
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email format";
  }

  if (!data.phone_number) {
    errors.phone_number = "Phone number is required";
  } else if (!/^09\d{9}$/.test(data.phone_number)) {
    errors.phone_number = "Invalid phone number format (e.g., 09xxxxxxxxx)";
  }

  // Address validation
  if (!data.street) errors.street = "Street is required";
  if (!data.barangay) errors.barangay = "Barangay is required";
  if (!data.city) errors.city = "City is required";
  if (!data.province) errors.province = "Province is required";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateStep2 = (data, selectedType) => {
  const errors = {};

  if (!data.verification_type) {
    errors.verification_type = "Please select a verification type";
  }

  if (selectedType?.is_pdf) {
    if (!data.id_file) {
      errors.id_file = "Please upload your PDF document";
    } else if (data.id_file.size > 10 * 1024 * 1024) {
      // 10MB
      errors.id_file = "File size must not exceed 10MB";
    }
  } else {
    if (selectedType?.has_front && !data.id_photo_front) {
      errors.id_photo_front = `Front ${selectedType?.has_back ? "ID" : "document"} photo is required`;
    } else if (data.id_photo_front?.size > 2 * 1024 * 1024) {
      // 2MB
      errors.id_photo_front = "File size must not exceed 2MB";
    }
    if (selectedType?.has_back && !data.id_photo_back) {
      errors.id_photo_back = "Back ID photo is required";
    } else if (data.id_photo_back?.size > 2 * 1024 * 1024) {
      // 2MB
      errors.id_photo_back = "File size must not exceed 2MB";
    }
  }

  if (!data.selfie_photo) {
    errors.selfie_photo = "Selfie photo is required";
  } else if (data.selfie_photo.size > 2 * 1024 * 1024) {
    // 2MB
    errors.selfie_photo = "File size must not exceed 2MB";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateStep3 = (data) => {
  const errors = {};

  // Password validation
  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!data.confirm_password) {
    errors.confirm_password = "Please confirm your password";
  } else if (data.password !== data.confirm_password) {
    errors.confirm_password = "Passwords do not match";
  }

  // Security questions validation
  if (!data.security_question_1) {
    errors.security_question_1 = "Please select security question 1";
  }
  if (!data.security_answer_1) {
    errors.security_answer_1 = "Security answer 1 is required";
  }

  if (!data.security_question_2) {
    errors.security_question_2 = "Please select security question 2";
  }
  if (!data.security_answer_2) {
    errors.security_answer_2 = "Security answer 2 is required";
  }

  if (data.security_question_1 === data.security_question_2) {
    errors.security_question_2 = "Please select different security questions";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
