interface ILoadingModal {
  isModalDisplay: boolean;
  closeModal: () => void;
}
const LoadingModal = ({ isModalDisplay, closeModal }: ILoadingModal) => {
  return (
    <div
      className={`${
        isModalDisplay ? "flex" : "hidden"
      } absolute inset-0 w-full h-screen items-center justify-center bg-gray20 z-50`}
    >
      <p className="animate-spin h-32 w-32 border-4 border-gray20 rounded-full border-t-transparent" />
    </div>
  );
};

export default LoadingModal;
