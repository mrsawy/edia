'use client';

import { useEffect, useRef, useState } from 'react';
// @ts-expect-error" instead
import { Wheel } from 'spin-wheel';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { PrizeSchemaType } from '@/lib/schema';
import { WithId } from '@/lib/types/WithId';
import Image from 'next/image';



const initialRotationSpeed = 1000;
const initialIncreaseState = 400;


type Props = {
    className?: string
    buttonText?: string
    items?: WithId<PrizeSchemaType & { label: string }>[]
}

export default function SpinWheel({ className, items = [], buttonText = "" }: Props) {


    const props = {
        items,
        rotationSpeedMax: 3000,
        rotationResistance: -100,
        radius: 0.81,
        itemBackgroundColors: ['#F7CFD8', '#A8F1FF', "#DBFFCB", "#ADB2D4", "#FCEFCB" , "#EC7FA9" , "#FEFFA7", "#E8B86D", "#FFF1D5", "#8EACCD", "#FA7070", "#B1AFFF", "#FFF2DB"]
    };




    const wheelRef = useRef<HTMLDivElement | null>(null);
    const wheelInstanceRef = useRef<Wheel | null>(null);

    const [rotationSpeed, setRotationSpeed] = useState(initialRotationSpeed)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRotationSpeed(initialRotationSpeed)
        }, 1000)

        return () => {
            clearTimeout(timeout)
        }
    }, [rotationSpeed])
    useEffect(() => {
        if (wheelRef.current && !wheelInstanceRef.current) {
            wheelInstanceRef.current = new Wheel(wheelRef.current, props);
        }
    }, []);

    return (
        <div className={cn('flex flex-col items-center justify-center w-full', className)}>
            <Button className='bg-zinc-600 cursor-pointer hover:bg-zinc-400 border-2 border-amber-50 text-xl p-7' onClick={() => {
                console.log(wheelInstanceRef.current)

                if (wheelInstanceRef.current && wheelInstanceRef.current._rotationSpeed > rotationSpeed) {
                    const newRotationSpeed = wheelInstanceRef.current._rotationSpeed + initialIncreaseState
                    wheelInstanceRef.current?.spin?.(newRotationSpeed);
                    setRotationSpeed(newRotationSpeed);
                    return
                }

                wheelInstanceRef.current?.spin?.(rotationSpeed);
                setRotationSpeed(p => p + 100);

            }} >{buttonText}</Button>
            {/* <div className='border border-amber-400'></div> */}
            <Image src="/images/cursor.png" alt="Cursor" width={100} height={100} style={{ transform: 'translateY(100px)' }} />

            <div className="wheel-wrapper w-full" ref={wheelRef}></div>
        </div>
    );
}
