import React, { useState } from 'react';

const Profile = () => {
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <div className="mb-5">
        <label htmlFor="profilePicInput">
          <div
            className="w-36 h-36 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
            style={{ backgroundImage: profilePic ? `url(${profilePic})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            {!profilePic && <span>Upload Image</span>}
          </div>
        </label>
        <input
          id="profilePicInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
      <div className="mb-5">
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-72 h-24 p-2 rounded border border-gray-300"
        />
      </div>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-72 p-2 rounded border border-gray-300"
        />
      </div>
      <button
        className="px-5 py-2 rounded bg-blue-500 text-white cursor-pointer"
      >
        Save Profile
      </button>
    </div>
  );
};

export default Profile;
 