import { ChangeEvent, useState } from 'react'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import OrangeButton from '@components/common/OrangeButton'
import { Textarea } from '@components/ui/textarea'
import { addUserBiography } from '@utils/api'

interface IEditBioModal {
  address: string
  isModalDisplay: boolean
  closeModal: () => void
}
const EditBioModal = ({ address, isModalDisplay, closeModal }: IEditBioModal) => {
  const [biography, setBiography] = useState<string>('')
  const [isUpdateBiography, setIsUpdateBiography] = useState<boolean>(false)

  const handleSetBiography = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBiography(event.target.value)
  }

  const updateBiography = async (_biography: string) => {
    await addUserBiography(address, _biography)
    setIsUpdateBiography(true)
    setBiography('')
    setTimeout(() => {
      closeModal()
      setIsUpdateBiography(false)
    }, 1000)
  }
  return (
    <div
      className={`${
        isModalDisplay ? 'flex' : 'hidden'
      } absolute inset-0 z-50 h-screen w-full items-center justify-center bg-gray20`}
    >
      <div className="mx-4 inline-flex h-1/3 w-full flex-col items-center justify-start rounded-xl bg-white px-6 pt-5">
        <button type="button" className="z-50 inline-flex w-full items-center justify-end" onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} className="size-4 rounded-full bg-squareGray p-3" />
        </button>
        <div className="absolute inset-0  z-40 mt-6 inline-flex size-full flex-col items-center justify-center px-10">
          {isUpdateBiography ? (
            <FontAwesomeIcon icon={faCircleCheck} className="size-20 text-gray60" />
          ) : (
            <>
              <Textarea placeholder="Bio." onChange={handleSetBiography} className="mb-8 w-full" />
              <OrangeButton text={'Save'} buttonAction={() => updateBiography(biography)} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditBioModal
