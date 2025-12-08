import { ModalTypes } from "@/features/workspaces/store/types";
import {create} from "zustand";

interface UseWorkspaceStoreModalProps {
    type:ModalTypes|null;
    isOpen:boolean;
    onOpen:(type:ModalTypes) => void;
    onClose:() =>void;
}
export const useInviteStore = create<UseWorkspaceStoreModalProps>((set) => ({
    type:null,
    isOpen:false,
    onOpen: (type) => set({isOpen:true,type}),
    onClose:() => set({isOpen:false,type:null})
}))