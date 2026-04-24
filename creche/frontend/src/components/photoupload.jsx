import React, { useState } from 'react';

const CLOUD_NAME = 'djp1oiwpe';
const UPLOAD_PRESET = 'petcare';

const MultiPhotoUpload = ({ onValueChange, multiple = true }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadedUrls, setUploadedUrls] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
        setUploadedUrls([]);
        setError(null);
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            alert('Please select a file first.');
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const urls = await Promise.all(
                selectedFiles.map(async (file) => {
                    const data = new FormData();
                    data.append('file', file);
                    data.append('upload_preset', UPLOAD_PRESET);

                    const response = await fetch(
                        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                        { method: 'POST', body: data }
                    );

                    if (!response.ok) throw new Error(`Failed to upload ${file.name}`);
                    const result = await response.json();
                    return result.secure_url;
                })
            );

            setUploadedUrls(urls);

            // Fix: if single image (displayimg), pass the string directly
            // if multiple images (allimg), pass the array
            if (onValueChange) {
                if (!multiple) {
                    onValueChange(urls[0]); // single string for profile/display pic
                } else {
                    onValueChange(urls);    // array for gallery images
                }
            }

        } catch (err) {
            console.error('Upload error:', err);
            setError('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full">
            {/* File Input */}
            <input
                type="file"
                multiple={multiple}
                accept="image/*"
                onChange={handleFileChange}
                className="mb-3 w-full text-sm"
                disabled={uploading}
            />

            {/* Preview selected files */}
            {selectedFiles.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-3">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="border rounded overflow-hidden">
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index}`}
                                className="w-full h-24 object-cover"
                            />
                            <p className="text-xs p-1 truncate text-gray-500">{file.name}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Button */}
            <button
                type="button"
                onClick={handleUpload}
                disabled={uploading || selectedFiles.length === 0}
                className={`w-full px-4 py-2 text-white rounded text-sm font-medium ${
                    uploading || selectedFiles.length === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                }`}
            >
                {uploading ? 'Uploading...' : `Upload ${selectedFiles.length > 0 ? `(${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''})` : ''}`}
            </button>

            {/* Success — show uploaded previews */}
            {uploadedUrls.length > 0 && (
                <div className="mt-3">
                    <p className="text-sm text-green-600 font-medium mb-2">✅ Uploaded successfully!</p>
                    <div className="grid grid-cols-3 gap-2">
                        {uploadedUrls.map((url, index) => (
                            <img key={index} src={url} alt={`Uploaded ${index}`}
                                className="w-full h-24 object-cover rounded border" />
                        ))}
                    </div>
                </div>
            )}

            {/* Error */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};

export default MultiPhotoUpload;