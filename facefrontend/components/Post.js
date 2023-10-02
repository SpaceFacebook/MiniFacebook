import React from 'react'
import imgProfile from '../images/man.png';
import Image from 'next/image';

const Post = ({ post }) => {
 
  return (
    <div className='flex flex-col' key={post.id}>
    <div className='bg-white mt-6 rounded-md p-4'>
    <div className="flex items-center space-x-2">
        <Image
          src={imgProfile}
          height={40}
          width={40}
          className="rounded-full cursor-pointer"
          alt=''
        />
       < div>
    <p className='font-medium'>{post.name}</p>
    <p className="text-xs text-gray-500">{post.timeStamp}</p>
    </div>
    </div>
       <div><p className='py-4'>
       {post.post}
        </p></div>
        {post.image && (
  <div className="relative h-60 md:h-96 bg-white">
    {console.log(post.image)}
    <img src={post.image} alt="" className="object-cover w-full h-full" />
  </div>
)}

   
    </div>
    
    </div>
  )
}

export default Post