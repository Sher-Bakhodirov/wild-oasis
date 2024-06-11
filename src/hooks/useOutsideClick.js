import { useEffect } from "react";

export function useOutsideClick(onCloseModal, modalRef) {
  useEffect(() => {
    function onOverlayClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onCloseModal();
      }
    }
    document.addEventListener("click", onOverlayClick, true);
    return () => {
      document.removeEventListener("click", onOverlayClick);
    };
  }, [onCloseModal, modalRef]);
}
