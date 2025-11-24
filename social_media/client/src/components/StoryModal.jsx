import { ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function StoryModal({ setShowModal, fetchStories }) {

    const bgColors = ["#4f46e5", "#c3aed", "#db2777", "#e11d48", "#ca8a04", "#0d9488"]

    const [mode, setMode] = useState("text")
    const [background, setBackground] = useState(bgColors[0])
    const [text, setText] = useState("")
    const [media, setMedia] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    // Handle image/video upload
    const handleMediaUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setMedia(file)
            setPreviewUrl(URL.createObjectURL(file))
            setMode("media")
        }
    }
    const handleCreateStory=async()=>{

    }

    return (
        <div className="fixed inset-0 z-[110] min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">

                {/* HEADER */}
                <div className="text-center mb-4 flex items-center justify-between">
                    <button
                        onClick={() => setShowModal(false)}
                        className="text-white p-2 cursor-pointer"
                    >
                        <ArrowLeft />
                    </button>

                    <h2 className="text-lg font-semibold">Create Story</h2>

                    <span className="w-6"></span>
                </div>

                {/* STORY PREVIEW CARD */}
                <div
                    className="rounded-lg h-96 flex items-center justify-center relative"
                    style={{ backgroundColor: mode === "text" ? background : "#000" }}
                >
                    {/* TEXT MODE */}
                    {mode === "text" && (
                        <textarea
                            className="bg-transparent text-white w-full h-full p-6 text-lg resize-none focus:outline-none"
                            placeholder="What's in your mind?"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    )}

                    {/* MEDIA MODE */}
                    {mode === "media" && previewUrl && (
                        media?.type.startsWith("image") ? (
                            <img
                                src={previewUrl}
                                className="object-contain max-h-full max-w-full rounded-lg"
                                alt="preview"
                            />
                        ) : (
                            <video
                                src={previewUrl}
                                className="object-contain max-h-full max-w-full rounded-lg"
                                controls
                            />
                        )
                    )}
                </div>

                {/* BACKGROUND COLOR PICKER */}
                {mode === "text" && (
                    <div className="flex mt-4 gap-2">
                        {bgColors.map((color) => (
                            <button
                                key={color}
                                className="w-6 h-6 rounded-full ring cursor-pointer"
                                style={{ backgroundColor: color }}
                                onClick={() => setBackground(color)}
                            />
                        ))}
                    </div>
                )}

                {/* MODE BUTTONS */}
                <div className="flex mt-4 gap-2">

                    {/* TEXT BUTTON */}
                    <button
                        onClick={() => {
                            setMode("text")
                            setMedia(null)
                            setPreviewUrl(null)
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${
                            mode === "text" ? "bg-white text-black" : "bg-zinc-800"
                        }`}
                    >
                        <TextIcon size={18} /> Text
                    </button>

                    {/* MEDIA UPLOAD BUTTON */}
                    <label
                        className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${
                            mode === "media" ? "bg-white text-black" : "bg-zinc-800"
                        }`}
                    >
                        <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={handleMediaUpload}
                        />

                        <Upload size={18} /> Photo/Video
                    </label>

                </div>
                <button
                    onClick={() =>
                        toast.promise(
                        handleCreateStory(), 
                        {
                            loading: 'Saving...',
                            success: <p>Story Added</p>,
                            error: (e) => <p>{e.message}</p>
                        }
                        )
                    }
                    className="flex items-center justify-center gap-2 text-white py-3 mt-4 rounded w-full cursor-pointer transition-all duration-200 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95"
                    >
                    <Sparkle size={18} /> Create Story
                </button>

            </div>
        </div>
    )
}

export default StoryModal
