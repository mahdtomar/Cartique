import {
    type Dispatch,
    type SetStateAction,
    type ChangeEvent,
    useRef,
    useEffect,
} from "react";

interface UploadImagePreviewProps {
    imageError: string;
    setImage: Dispatch<SetStateAction<File | undefined>>;
}

const UploadImagePreview = ({
    imageError,
    setImage,
}: UploadImagePreviewProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    const captureImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];
        console.log(file)
        setImage(file);

        const reader = new FileReader();
        reader.onload = () => {
            console.log(imgRef.current)
            if (reader.result && imgRef.current) {
                imgRef.current.src = reader.result as string;
            }
        };

        reader.readAsDataURL(file);
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    useEffect(() => { console.log(imgRef) }, [imgRef])
    return (
        <div className="flex flex-col w-full h-full gap-2">
            <div className="flex flex-1  wrapper  rounded overflow-hidden relative border shadow-lg  aspect-[218/233] max-h-[350px]" onClick={triggerFileInput}>
                <input
                    ref={fileInputRef}
                    type="file"
                    name="product-image"
                    id="productImage"
                    accept="image/jpg, image/png, image/jpeg"
                    className="hidden"
                    onChange={captureImage}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer">
                    <p className="absolute top-[50%] left-[50%] translate-[-50%] whitespace-nowrap pointer">Upload Image</p>
                    <img src="" ref={imgRef} className="relative z-9 object-fill " />
                </div>

            </div>
            {imageError && (
                <p className="text-red-400 text-center font-bold">
                    {imageError}
                </p>
            )}
        </div>
    );
};

export default UploadImagePreview;
