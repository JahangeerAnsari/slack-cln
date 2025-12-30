import {create} from "zustand";
import {ModalTypes} from "./types"
interface UseWorkspaceStoreModalProps {
    type:ModalTypes|null;
    isOpen:boolean;
    onOpen:(type:ModalTypes) => void;
    onClose:() =>void;
}
export const useWorkspaceStore = create<UseWorkspaceStoreModalProps>((set) => ({
    type:null,
    isOpen:false,
    onOpen: (type) => set({isOpen:true,type}),
    onClose:() => set({isOpen:false,type:null})
}))