import { BadgeCheck, Heart, MessageCircle, Share2 } from 'lucide-react'
import moment from 'moment'
import React, { useState } from 'react'
import { dummyUserData } from "../assets/assets"

function PostCard({ post }) {
    const postWithHashtags = post.content.replace(/(#\w+)/g, '<span class="text-indigo-600">$1</span>')

    const [likes, setLikes] = useState(post.likes_count)
    const currentUser = dummyUserData

    const handleLike = () => {
        // Toggle like
        setLikes(likes + 1)
    }

    return (
        <div className="w-full max-w-2xl rounded-xl shadow p-4 space-y-4 bg-white">
            
            {/* User Info */}
            <div className="inline-flex items-center gap-3 cursor-pointer">
                <img
                    src={post.user?.profile_picture}
                    className="size-7 sm:size-8 rounded-full object-cover border border-white"
                />

                <div>
                    <div className="flex items-center space-x-1">
                        <span>{post.user?.full_name}</span>
                        <BadgeCheck size={18} className="text-blue-500" />
                    </div>
                    <div className="text-gray-500 text-sm">
                        @{post.user.username} {moment(post.createdAt).fromNow()}
                    </div>
                </div>
            </div>

            {/* Content */}
            {post.content && (
                <div
                    className="text-gray-800 text-sm whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: postWithHashtags }}
                />
            )}

            {/* Images */}
            <div className="grid grid-cols-2 gap-2">
                {post.image_urls.map((img, index) => (
                    <img
                        src={img}
                        key={index}
                        className={`w-full h-48 object-cover rounded-lg ${
                            post.image_urls.length === 1 ? "col-span-2 h-auto" : ""
                        }`}
                    />
                ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 text-gray-600 text-sm pt-2 border-t border-gray-300">
                <div className="flex items-center gap-1">
                    <Heart
                        className={`w-4 h-4 cursor-pointer`}
                        onClick={handleLike}
                    />
                    <span>{likes}</span>
                </div>

                <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>12</span>
                </div>

                <div className="flex items-center gap-1">
                    <Share2 className="w-4 h-4" />
                    <span>7</span>
                </div>
            </div>
        </div>
    )
}

export default PostCard

