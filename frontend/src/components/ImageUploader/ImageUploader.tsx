import React, { useState, ChangeEvent,useEffect } from "react";

interface ImageUploaderProps {
  onImageUpload: (images: File[], error: string) => void; // Update the prop type to accept File objects
  currentImages: File[]; // Update the type of currentImages to File[]
  currentError: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  currentImages,
  currentError,
}) => {
  const [images, setImages] = useState<File[]>(currentImages); // Use File[] for the state
  const [error, setError] = useState<string>(currentError);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    const newImages: File[] = [];
    const maxSize: number = 2000; // in pixels

    for (let i = 0; i < fileList!.length; i++) {
      const file = fileList![i];
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          if (img.width > maxSize || img.height > maxSize) {
            setError(
              `Image ${file.name} exceeds the maximum size of ${maxSize}px.`
            );
          } else if (
            !["image/png", "image/jpeg"].includes(file.type.toLowerCase())
          ) {
            setError(
              `Image ${file.name} is not a valid file type. Only PNG and JPEG are allowed.`
            );
          } else {
            newImages.push(file); // Push the File object directly
            if (newImages.length === fileList!.length) {
              setImages([...images, ...newImages]);
              setError("");
            }
          }
        };
        img.onerror = () => {
          setError(`Image ${file.name} could not be loaded.`);
        };
        img.src = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  useEffect(() => {
    // Notify the parent component (HotelDetailsForm) about changes in images or errors
    onImageUpload(images, error);
  }, [images, error, onImageUpload]);


  return (
    <div className="row x-gap-20 y-gap-20 pt-15">
      <div className="col-auto">
        <div className="w-200">
          <label htmlFor="uploadGallery" className="d-flex ratio ratio-1:1">
            <div className="flex-center flex-column text-center bg-blue-2 h-full w-1/1 absolute rounded-4 border-type-1">
              <div className="icon-upload-file text-40 text-blue-1 mb-10" />
              <div className="text-blue-1 fw-500">Upload Images</div>
            </div>
          </label>
          <input
            type="file"
            id="uploadGallery"
            name="images"
            multiple
            accept="image/png, image/jpeg"
            className="d-none"
            onChange={handleFileUpload}
          />
          <div className="text-start mt-10 text-14 text-light-1">
            PNG or JPG no bigger than 800px wide and tall.
          </div>
        </div>
      </div>
      {/* End uploader field */}

      {images.map((image, index) => (
        <div className="col-auto" key={index}>
          <div className="d-flex ratio ratio-1:1 w-200">
            <img src={URL.createObjectURL(image)}  alt="image" className="img-ratio rounded-4" />
            <div
              className="d-flex justify-end px-10 py-10 h-100 w-1/1 absolute"
              onClick={() => handleRemoveImage(index)}
            >
              <div className="size-40 bg-white rounded-4 flex-center cursor-pointer">
                <i className="icon-trash text-16" />
              </div>
            </div>
          </div>
        </div>
      ))}

      {error && <div className="col-12 mb-10  text-red-1">{error}</div>}
    </div>
  );
};

export default ImageUploader;
