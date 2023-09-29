import React from 'react'
import imgProfile from '../images/man.png';
import ImagePost from '../images/ImagePost.jpeg'
import Image from 'next/image';
const Post = () => {
  return (
    <div className='flex flex-col'>
    <div className='bg-white mt-6 rounded-md p-4'>
    <div className="flex items-center space-x-2">
        <Image
          src={imgProfile}
          height={40}
          width={40}
          className="rounded-full cursor-pointer"
        />
       < div>
    <p className='font-medium'>Kaoutar Bouarif</p>
    <p className='text-xs text-gray-500'>{ new Date().toLocaleString()}</p></div>
    </div>
       <div><p className='py-4'>
        how are you 
        </p></div>
        <div className='relative h-60 md:h-96 bg-white'>
            <Image src={ImagePost} objectFit="cover" layout="fill"/>
            </div> 
    </div>
    
    </div>
  )
}

export default Post