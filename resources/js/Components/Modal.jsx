import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";

export default function Modal({
  children,
  show = false,
  maxWidth = "2xl",
  closeable = true,
  onClose = () => {},
  title = "",
}) {
  const close = () => {
    if (closeable) {
      onClose();
    }
  };

  const maxWidthClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "3xl": "sm:max-w-3xl",
  }[maxWidth];

  return (
    <Transition show={show} leave="duration-200">
      <Dialog
        as="div"
        id="modal"
        className="z-1000 fixed inset-0 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0"
        onClose={close}
      >
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </TransitionChild>

        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <DialogPanel
            className={`sm:w-90 mx-auto mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto ${maxWidthClass} max-h-[90vh] max-w-[1300px]`}
            style={{ width: "calc(100% - 50px)" }}
          >
            {/* Fixed Header */}
            <div className="bg-green-900 px-6 py-2 text-white">
              <h2 className="text-lg font-bold">{title}</h2>
              <button
                onClick={close}
                className="absolute right-2.5 top-2.5 h-[22px] w-[22px] rounded-full bg-green-800 bg-opacity-0 text-white hover:bg-green-800 hover:bg-opacity-25"
              >
                <i className="fa-solid fa-xmark mt-[-5px]"></i>
              </button>
            </div>

            {/* Scrollable Content */}
            <div
              className={`${maxWidthClass} max-w-[1300px] flex-1 overflow-y-auto`}
              style={{ maxHeight: "calc(90vh - 50px)" }}
            >
              {children}
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
