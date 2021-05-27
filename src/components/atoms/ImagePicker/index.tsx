import React, { useEffect, useState } from 'react';

import { ActionResultEnum } from '../../../models/enums/actionResultTypes';

import { useActionResult } from '../../../hooks/useActionResult';

import { BookReader, Container, EditIcon } from './styles';

interface ImagePickerProps {
    onImagePick(image: File): void;
    imageUrl?: string;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
    onImagePick,
    imageUrl
}: ImagePickerProps): JSX.Element => {
    const { show } = useActionResult();

    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState<File>();

    useEffect(() => {
        if (imageUrl) setImage(imageUrl);
    }, [imageUrl]);

    useEffect(() => {
        if (imageFile) onImagePick(imageFile);
    }, [imageFile]);

    const readUrl = (files: FileList | null): void => {
        if (files && files[0]) {
            const file = files[0];
            setImageFile(file);

            if (!file.type.match(/image.*/)) {
                show(
                    'Erro ao carregar arquivo!',
                    'O arquivo não é uma imagem!',
                    ActionResultEnum.ERROR
                );
                return;
            }

            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>): void => {
                setImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addImage = (): void => {
        document.getElementById('image-picker-input')?.click();
    };

    return (
        <Container onClick={addImage}>
            <input
                id="image-picker-input"
                type="file"
                accept="image/*"
                onChange={(event) => readUrl(event.target.files)}
            ></input>
            {!image && <BookReader />}
            {image && <img src={image} alt="Image Picker" />}
            <div className="overlay">
                <div className="circle">
                    <EditIcon />
                </div>
            </div>
        </Container>
    );
};

export default ImagePicker;
