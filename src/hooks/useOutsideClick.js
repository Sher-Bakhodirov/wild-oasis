import { useEffect } from "react";

export function useOutsideClick(onCloseModal, modalRef, listenCapturing=true ) {
  useEffect(() => {
    function onOverlayClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onCloseModal();
      }
    }
    document.addEventListener("click", onOverlayClick, listenCapturing);
    return () => {
      document.removeEventListener("click", onOverlayClick);
    };
  }, [onCloseModal, modalRef, listenCapturing]);
}
