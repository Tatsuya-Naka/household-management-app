"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { IoReceiptOutline } from "react-icons/io5";

export default function RecordImage() {
    const { getValues, setValue, setError, formState: { isSubmitting } } = useFormContext();
    const values = getValues();
    const [image, setImage] = useState(values.object ? `${values.object}?noCache=${Date.now()}` : "" );

    const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.currentTarget.files;
        if (files && files.length > 0 && files[0]) {
            const file = files[0];
            console.log("------------------------------------------- file input -------------------------------------------");
            // Use tesseract.js to recognize characters in the image
            const Tesseract = require('tesseract.js');
            const { data: { text } } = await Tesseract.recognize(file, 'eng');

            console.log("Recognized Text:", text);
            console.log("------------------------------------------- -------------------------------------------")

            const formData = new FormData();
            formData.append("file", file);
            formData.append("imageId", values.imageId);

            const response = await fetch("./api/new-record/image", {
                method: "POST",
                // mutipart/form-data
                body: formData,
            });
            const result = await response.json();
            if (!response.ok) {
                setError("object", result.message);
            }

            setImage(`${result.url}?noCahche=${Date.now()}`);
        }
    };

    useEffect(() => {
        setValue("object", image);
    }, [image, setValue])

    return (
        <label className={`${image && "border-2 border-solid border-gray-500/30"} relative overflow-hidden mb-3 h-[240px] flex items-start justify-center bg-gradient-to-r from-sky-300 via-violet-300 to-pink-100 w-full rounded-lg cursor-pointer hover:opacity-80`}>
            {image ?
                <div className="absolute inset-0">

                    <Image
                        src={image}
                        alt={"Record Image"}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
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
                disabled={isSubmitting}
            />
        </label>
    )
}