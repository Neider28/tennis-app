import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Button, Image, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useMyContext } from '@/context/MainContext';
import { EditProfileAvatar } from '@/services/Authentication';
import { getTokenCookie } from '@/utils/cookie.util';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  isActive: boolean,
  url: string,
};

const EditUserAvatar: React.FC<Props> = ({ isActive, url }) => {
  const [image, setImage] = useState<File | null>(null);
  const editorRef = useRef<AvatarEditor>(null);
  const { toggleEditUserAvatar, setToggleEditUserAvatar } = useMyContext();
  const { onClose } = useDisclosure();
  const router = useRouter();

  const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      setImage(selectedFile);
      setToggleEditUserAvatar(!toggleEditUserAvatar);
    }
  };

  const handleSaveImage = async () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();

      canvas.toBlob(async (blob: Blob | null) => {
        if (blob) {
          const file: File = new File([blob], 'avatar.png', { type: 'image/png' });
      
          const token = getTokenCookie();

          const response = await EditProfileAvatar(token, file);

          if(response) {
            setToggleEditUserAvatar(!toggleEditUserAvatar);
            router.push('/profile');
          } else {
            toast.error('There was an error, please try again');
          }
        }
      }, 'image/png');
    }
  };

  const handleClose = () => {
    onClose();
    setToggleEditUserAvatar(!toggleEditUserAvatar);
  };

  return (
    <div className='w-full relative'>
      <Image
        width={200}
        alt="Avatar"
        src={url}
      />
      <input
        type="file"
        accept="image/*"
        className="absolute top-0 left-0 w-[200px] h-[200px] z-10 opacity-0 cursor-pointer"
        onChange={handleSelectImage}
      />
      {image && (
        <Modal backdrop="blur" isOpen={isActive} onClose={handleClose}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Crop Your New Profile Avatar</ModalHeader>
            <ModalBody className='flex justify-center items-center pb-6 gap-6'>
              <AvatarEditor
                ref={editorRef}
                image={image}
                width={300}
                height={300}
                border={0}
                color={[148, 85, 211, 0.5]}
                scale={1}
                borderRadius={250}
                rotate={0} />
              <Button color="secondary" variant="solid" className='w-full' onPress={handleSaveImage}>
                Save
              </Button>
            </ModalBody>
            <ToastContainer theme="dark" autoClose={5000} />
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default EditUserAvatar;
