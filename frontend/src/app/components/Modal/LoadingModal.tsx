interface ILoadingModal {
  isModalDisplay: boolean
}
const LoadingModal = ({ isModalDisplay }: ILoadingModal) => {
  return (
    <div
      className={`${
        isModalDisplay ? 'flex' : 'hidden'
      } absolute inset-0 z-50 h-screen w-full items-center justify-center bg-gray20`}
    >
      <p className="size-32 animate-spin rounded-full border-4 border-gray20 border-t-transparent" />
    </div>
  )
}

export default LoadingModal
