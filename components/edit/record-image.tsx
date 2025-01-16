"use client";
import Image from "next/image";
import { IoReceiptOutline } from "react-icons/io5";
import { IoIosRemove } from "react-icons/io";
import { useState } from "react";

interface EditRecordImageProps {
    object: string | null | undefined;
};

export default function EditRecordImage({ object }: EditRecordImageProps) {
    const [image, setImage] = useState<string | null | undefined>(object)

    const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        // TODO: Add image into the temp AWS S3 bucket then, read it.
        // If saved, move the image into the permanet AWS S3 bucket. 
        // If not leave it (set the bucket rule in s3 to discard it within one hour)
    }

    const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setImage(null);
    }

    return (
        <label className={`${image && "border-2 border-solid border-gray-500/30"} relative overflow-hidden mb-3 h-[240px] flex items-start justify-center bg-gradient-to-r from-sky-300 via-violet-300 to-pink-100 w-full rounded-lg cursor-pointer hover:opacity-80`}>
            {image ?
                <>
                    <div className="absolute inset-0">

                        <Image
                            src={image}
                            alt={"Record Image"}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>

                    {/* handleRemove */}
                    <button
                        className="absolute right-2 top-2 z-10 p-1.5 rounded-md hover:bg-white/50 transition duration-100 ease-in cursor-pointer"
                        type="button"
                        onClick={handleRemoveImage}
                    >
                        <IoIosRemove size={32} className="fill-slate-800" />
                    </button>
                </>
                :
                <div className="w-full flex items-center justify-center h-full">
                    <IoReceiptOutline size={48} className="fill-black mr-3" />
                    <span>Upload image</span>
                </div>
            }
            <input
                type="file"
                hidden
                name="object"
                onChange={handleImageFile}
            // disabled={isSubmitting}
            />
        </label>
    )
}