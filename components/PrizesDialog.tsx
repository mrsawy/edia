import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ar from "@/lib/translation/ar.json"
import Icons from './ui/icons';
import PrizeForm from './PrizeForm';

export enum Emode {
    Edit = "edit",
    Add = "add"
}

type Props = {
    className?: string
    id?: string
    content?: string
    prizeType?: string
    mode?: Emode
}




const PrizeDialog: React.FC<Props> = ({  id, content = "", prizeType = "", mode = Emode.Add }) => {
    return (<Dialog  >
        <DialogTrigger style={{direction:"rtl"}} >
            {mode == Emode.Add ? (<div className="bg-zinc-200 cursor-pointer hover:bg-zinc-400 text-4xl rounded-lg text-zinc-800 border-2 duration-200 p-4 flex items-center">
                {ar.add_new_prize}
                <Icons.add className="mr-2 !h-10 w-10!" />
            </div>)
                : (<Icons.edit className="mr-2 !h-7 w-7! cursor-pointer" />)
            }

        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className='px-5 !text-center'>{ar.add_new_prize}</DialogTitle>
                <PrizeForm id={id} content={content} prizeType={prizeType} className='p-4' />
            </DialogHeader>
        </DialogContent>
    </Dialog>
    );
};

export default PrizeDialog;