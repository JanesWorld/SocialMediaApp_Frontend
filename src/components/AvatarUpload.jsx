const AvatarUpload = ({ onAvatarChange }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create FormData and append the file
      const formData = new FormData();
      formData.append("profile_pic", file);

      // Make an API request to upload
      axiosInstance
        .put("/api/upload-avatar/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          // Handle successful upload
          onAvatarChange(response.data.profile_pic);
        })
        .catch((error) => console.error("Upload error", error));
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default AvatarUpload;
