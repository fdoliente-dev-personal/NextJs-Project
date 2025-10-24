'use client';

import { useState } from 'react';
import styles from './page.module.css';
import TextInput from '@/components/TextInput';
import useCreateUser from '../hooks/useCreateUser';

export default function CreateModal({ onUserCreated }: { onUserCreated?: (user: any) => void }) {
  const { formData, handleChange, handleSubmit, error, emailError, resetForm, showModal, setShowModal } = useCreateUser(onUserCreated);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
      resetForm();
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

            <form onSubmit={handleSubmit} className={`grid grid-cols-3 gap-4 p-4 ${styles.modalForm}`}>
              <TextInput 
                label="Name" 
                value={formData.name} 
                onChange={handleChange('name')} 
                placeholder="Enter name" 
              />
              <TextInput label="Username" 
                value={formData.username} 
                onChange={handleChange('username')} 
                placeholder="Enter username" 
                />
              <TextInput 
                label="Email" 
                value={formData.email} 
                onChange={handleChange('email')} 
                placeholder="Enter email"
              />
              <TextInput 
                label="Street" 
                value={formData.street} 
                onChange={handleChange('street')} 
                placeholder="Enter street" 
              />
              <TextInput 
                label="Suite" 
                value={formData.suite} 
                onChange={handleChange('suite')} 
                placeholder="Enter suite" 
              />
              <TextInput 
                label="City" 
                value={formData.city} 
                onChange={handleChange('city')} 
                placeholder="Enter city" 
              />
              <TextInput 
                label="Zipcode" 
                value={formData.zipcode} 
                onChange={handleChange('zipcode')} 
                placeholder="Enter zipcode" 
              />
              <TextInput 
                label="Lat" 
                value={formData.lat} 
                onChange={handleChange('lat')} 
                placeholder="Enter latitude" 
              />
              <TextInput 
                label="Lng" 
                value={formData.lng} 
                onChange={handleChange('lng')} 
                placeholder="Enter longitude" 
              />
              <TextInput 
                label="Phone" 
                value={formData.phone} 
                onChange={handleChange('phone')} 
                placeholder="Enter phone" 
              />
              <TextInput 
                label="Website" 
                value={formData.website} 
                onChange={handleChange('website')} 
                placeholder="Enter website" 
              />
              <TextInput 
                label="Company Name" 
                value={formData.companyName} 
                onChange={handleChange('companyName')} 
                placeholder="Enter company name" 
              />
              <TextInput 
                label="Catch Phrase" 
                value={formData.catchPhrase} 
                onChange={handleChange('catchPhrase')} 
                placeholder="Enter catch phrase" 
              />
              <TextInput 
                label="BS" 
                value={formData.bs} 
                onChange={handleChange('bs')} 
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
