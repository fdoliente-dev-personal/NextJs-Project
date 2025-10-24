import { useState } from "react";
import Validator from "validator";

export default function useCreateUser(onUserCreated?: (user: any) => void) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    lat: "",
    lng: "",
    phone: "",
    website: "",
    companyName: "",
    catchPhrase: "",
    bs: "",
  });

  const [error, setFormError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      username: "",
      email: "",
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      lat: "",
      lng: "",
      phone: "",
      website: "",
      companyName: "",
      catchPhrase: "",
      bs: "",
    });
    setFormError("");
    setEmailError("");
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const isEmpty = Object.values(formData).some((value) => !value.trim());
    if (isEmpty) {
      setFormError("All fields are required!");
      setEmailError("");
      return;
    }

    if (!Validator.isEmail(formData.email)) {
      setEmailError("Please enter a valid email address.");
      setFormError("");
      return;
    }

    const newUser = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      address: {
        street: formData.street,
        suite: formData.suite,
        city: formData.city,
        zipcode: formData.zipcode,
        geo: {
          lat: formData.lat,
          lng: formData.lng,
        },
      },
      phone: formData.phone,
      website: formData.website,
      company: {
        name: formData.companyName,
        catchPhrase: formData.catchPhrase,
        bs: formData.bs,
      },
    };

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        const result = await res.json();
        if (onUserCreated) onUserCreated(result.user);

        resetForm();
        setShowModal(false);
        alert("User added successfully");

        window.location.reload();
      } else {
        alert("Error adding user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    error,
    emailError,
    resetForm,
    showModal,
    setShowModal,
  };
}
