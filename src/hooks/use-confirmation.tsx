import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {  JSX, useState } from "react";

export const useConfirmation = (
  title: string,
  message: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);
  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromise({ resolve });
    });
  const handleClose = () => {
    setPromise(null);
  };
  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };
  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };
  const ConfirmDialog = () =>(
    <Dialog open={promise !== null}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{message}</DialogDescription>
      </DialogHeader>
      <DialogFooter className="pt-2">
        <Button variant="outline" onClick={handleCancel} >
         Cancel
        </Button>
         <Button variant="outline" onClick={handleConfirm} >
         Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
  return [ConfirmDialog, confirm];
};
