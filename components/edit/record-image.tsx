"use client";
import Image from "next/image";
import { IoReceiptOutline } from "react-icons/io5";
import { IoIosRemove } from "react-icons/io";
import { useState } from "react";

interface EditRecordImageProps {
    object: string | null | undefined;
    setImageCondition: (condition: {isStored: boolean, isDeleted: boolean}) => void;
};


export default function EditRecordImage({ object, setImageCondition }: EditRecordImageProps) {
    const [image, setImage] = useState<string | null | undefined>(object ? `${object}?noCache=${Date.now()}`: "");
    const [imageStored, setImageStored] = useState<boolean>(false);
    const imageId = object?.split("/").pop();

    const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const files = e.currentTarget.files;
        if (files && files.length > 0 && files[0] && imageId) {
            const formData = new FormData();
            formData.append("file", files[0]);
            formData.append("imageId", imageId);

            const response = await fetch("/register/api/new-record/image", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            if (!response.ok) {
                console.log(result.message);
            }

            setImage(`${result.url}?noCache=${Date.now()}`);
            setImageStored(true);
            setImageCondition({isStored: true, isDeleted: false});
        }
    }

    const handleRemoveImage = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setImage(null);
        if (!imageStored) return;
        const response = await fetch("/server/new-record/cancel", {
            method: "POST",
            body: JSON.stringify({imageId: imageId}),
        });
        if (response.ok) {
            setImageStored(false);
            setImageCondition({isStored: false, isDeleted: true});
        }
    }

    return (
        <div className="w-full h-[240px] relative mb-3">
            <label className={`${image && "border-2 border-solid border-gray-500/30"} relative overflow-hidden h-[240px] flex items-start justify-center bg-gradient-to-r from-sky-300 via-violet-300 to-pink-100 w-full rounded-lg cursor-pointer hover:opacity-80`}>
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

            {/* handleRemove */}
            {image &&
                <div className="absolute right-2 top-2 z-[999]">
                    <button
                        className=" p-1.5 rounded-md hover:bg-white/50 transition duration-100 ease-in cursor-pointer"
                        type="button"
                        onClick={handleRemoveImage}
                    >
                        <IoIosRemove size={32} className="fill-slate-800" />
                    </button>
                </div>
            }
        </div>
    )
}