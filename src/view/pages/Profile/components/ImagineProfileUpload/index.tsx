import { UploadIcon, TrashIcon } from '@radix-ui/react-icons'

import { useAuth } from '../../../../../app/hooks/useAuth';
import { getStringInitials } from '../../../../../app/utils/getStringInitials';
import { imagePath } from '../../../../../app/utils/imagePath';

import { Spinner } from '../../../../components/Spinner';

import { useImageProfileUpload } from './useImageProfileUpload';
import { cn } from '../../../../../app/utils/cn';

export default function ImageProfileUpload() {
  const { user } = useAuth();

  const {
    inputRef,
    isPending,
    handleFileUpload,
    handleDeleteImage
  } = useImageProfileUpload();

  const hasImage = user?.avatarUrl;

  return (
    <form
      aria-labelledby="image"
      className="flex w-full flex-col items-center justify-center space-y-3"
    >
      <input
        ref={inputRef}
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      <div
        className={cn(
          "bg-red-200 rounded-full w-[9rem] h-[9rem] flex items-center justify-center border transition-all relative",
          isPending && "cursor-not-allowed opacity-50 bg-gray-100 hover:bg-gray-100"
        )}
      >
        <div
          className={cn(
            'w-full h-full bg-gray-900 absolute rounded-full bg-opacity-40 opacity-0 flex items-center justify-center hover:opacity-100 transition-all gap-2',
            isPending && 'hidden'
          )}
        >
          <button
            type='button'
            onClick={() => inputRef.current?.click()}
            className='cursor-pointer hover:scale-110 transition-all bg-gray-100 p-1 rounded-md'
          >
            <UploadIcon className='w-5 h-5 text-red-600'/>
          </button>

          {hasImage && (
            <button
              type='button'
              onClick={() => handleDeleteImage()}
              className='cursor-pointer hover:scale-110 transition-all bg-gray-100 p-1 rounded-md'
            >
              <TrashIcon className='w-5 h-5 text-red-600'/>
            </button>
          )}
        </div>

        {isPending && (
          <Spinner />
        )}

        {hasImage && !isPending && (
          <img
            src={imagePath(user?.avatarUrl)}
            alt={user?.name}
            className="w-full h-full rounded-full object-cover"
          />
        )}

        {!hasImage && !isPending && (
          <span className="text-[2rem] text-red-700">
            {getStringInitials(user?.name)}
          </span>
        )}
      </div>
    </form>
  )
}