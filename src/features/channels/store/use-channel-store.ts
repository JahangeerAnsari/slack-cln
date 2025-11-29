import { ModalTypes } from "@/features/workspaces/store/types";
import {create} from "zustand";

interface UseChannelStoreModalProps {
    type:ModalTypes|null;
    isOpen:boolean;
    onOpen:(type:ModalTypes) => void;
    onClose:() =>void;
}
export const useChannelStore = create<UseChannelStoreModalProps>((set) => ({
    type:null,
    isOpen:false,
    onOpen: (type) => set({isOpen:true,type}),
    onClose:() => set({isOpen:false,type:null})
}))