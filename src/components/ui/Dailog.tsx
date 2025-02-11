import React from 'react';
import {DialogBody, DialogContent, DialogHeader, DialogRoot, DialogTitle, DialogTrigger} from "@/components/ui/dialog";

const Dailog = ({isOpen, onClose, triggerButton, title, body}: {
  isOpen: boolean,
  onClose: () => void,
  triggerButton?: React.ReactNode,
  title: string | React.ReactNode,
  body: React.ReactNode
}) => {
  return (
    <DialogRoot lazyMount open={isOpen} onOpenChange={onClose} size={"xl"}>
      {triggerButton ? (
        <DialogTrigger asChild>
          {triggerButton}
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>{body}</DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default Dailog;
