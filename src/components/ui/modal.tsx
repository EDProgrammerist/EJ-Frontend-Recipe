import { useEffect, useId, useRef, type ReactNode } from "react";
import { XIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <dialog ref={dialogRef} className="recipe-dialog" aria-labelledby={titleId} onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="flex min-h-0 flex-col">
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-emerald-900/10 px-5 py-5 sm:px-8">
          <h2 id={titleId} className="display-heading text-3xl">{title}</h2>
          <Button variant="tertiary" onClick={onClose} aria-label="Close dialog" className="size-11 shrink-0 px-0"><XIcon size={21} aria-hidden="true" /></Button>
        </header>
        <div className="overflow-y-auto overscroll-contain p-5 sm:p-8">{children}</div>
      </div>
    </dialog>
  );
}
