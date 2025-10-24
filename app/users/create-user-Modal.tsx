"use client";

import { useState } from "react";
import styles from "./page.module.css";
import TextInput from "@/components/TextInput";
import Validator from 'validator';

export default function CreateModal({ onUserCreated }: { onUserCreated?: (user: any) => void }) {
  const [showModal, setShowModal] = useState(false);
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

  const [ error, setFormError ] = useState("");
  const [ emailError, setEmailError ] = useState("");
  
  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
      setFormData(
        {
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
        }
      );
      setFormError("");
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        const result = await res.json();
        if (onUserCreated) onUserCreated(result.user);

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
        setShowModal(false);
        setEmailError("");
        setFormError("");
        alert("User added successfully");
      } else {
        alert("Error adding user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <main>
      <div className="flex items-center">
        <h1 className={styles.title}>Users</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded-lg ml-10"
          onClick={() => setShowModal(true)}
        >
          Create User
        </button>
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
          <div className={styles.modalContent}>
            <h2 className="text-black font-bold text-center mb-4">Create User</h2>

            <form
              onSubmit={handleSubmit}
              className={"grid grid-cols-3 gap-4 p-4 " + styles.modalForm}
            >

              <TextInput 
                label="Name" 
                value={formData.name} 
                onChange={handleChange("name")}
                placeholder="Enter name" 
               />
              <TextInput 
                label="Username" 
                value={formData.username} 
                onChange={handleChange("username")} 
                placeholder="Enter username" 
              />
              <TextInput 
                label="Email" 
                value={formData.email} 
                onChange={handleChange("email")} 
                placeholder="Enter email" 
              />
              <TextInput 
                label="Street" 
                value={formData.street} 
                onChange={handleChange("street")} 
                placeholder="Enter street" 
              />
              <TextInput 
                label="Suite" 
                value={formData.suite} 
                onChange={handleChange("suite")} 
                placeholder="Enter suite" 
              />
              <TextInput 
                label="City" 
                value={formData.city} 
                onChange={handleChange("city")} 
                placeholder="Enter city" 
              />
              <TextInput 
                label="Zipcode" 
                value={formData.zipcode} 
                onChange={handleChange("zipcode")} 
                placeholder="Enter zipcode" 
              />
              <TextInput 
                label="Lat" 
                value={formData.lat}
                onChange={handleChange("lat")} 
                placeholder="Enter latitude" 
               />
              <TextInput 
                label="Lng" 
                value={formData.lng} 
                onChange={handleChange("lng")} 
                placeholder="Enter longitude" 
              />
              <TextInput 
                label="Phone" 
                value={formData.phone} 
                onChange={handleChange("phone")} 
                placeholder="Enter phone" 
              />
              <TextInput 
                label="Website" 
                value={formData.website} 
                onChange={handleChange("website")} 
                placeholder="Enter website" 
              />
              <TextInput 
                label="Company Name" 
                value={formData.companyName} 
                onChange={handleChange("companyName")} 
                placeholder="Enter company name" 
              />
              <TextInput 
                label="Catch Phrase" 
                value={formData.catchPhrase} 
                onChange={handleChange("catchPhrase")} 
                placeholder="Enter catch phrase" 
              />
              <TextInput 
                label="BS" 
                value={formData.bs} 
                onChange={handleChange("bs")} 
                placeholder="Enter business slogan"
               />
              {error && (
                <p className="text-red-500 text-sm mt-4 col-span-3 text-center">{error}</p>
              )}
              {emailError && (
                <p className="text-red-500 text-sm mt-4 col-span-3 text-center">{emailError}</p>
              )}
              <div className="col-span-3 flex justify-center mt-4">
                <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
