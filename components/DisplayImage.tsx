'use client'

import Image from 'next/image';

type Props = {
    imageSrc: string
}


export default function DisplayImage({ imageSrc }: Props) {
    return (
        <div>
            <Image
                src={imageSrc}
                alt="Car Image"
                width={500}
                height={300}
            />
        </div>
    )
}