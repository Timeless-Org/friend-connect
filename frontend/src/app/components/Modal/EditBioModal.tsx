import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { ChangeEvent, useState } from "react";
import { Textarea } from "@components/ui/textarea";
import OrangeButton from "@components/common/OrangeButton";
import { addUserBiography } from "@utils/api";

interface IEditBioModal {
  address: string;
  isModalDisplay: boolean;
  closeModal: () => void;
}
const EditBioModal = ({ address, isModalDisplay, closeModal }: IEditBioModal) => {
  const [biography, setBiography] = useState<string>("");
  const [isUpdateBiography, setIsUpdateBiography] = useState<boolean>(false);

  const handleSetBiography = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBiography(event.target.value);
  };

  const updateBiography = async (_biography: string) => {
    await addUserBiography(address, _biography);
    setIsUpdateBiography(true);
    setBiography("");
    setTimeout(() => {
      closeModal();
      setIsUpdateBiography(false);
    }, 1000);
  };
  return (
    <div
      className={`${
        isModalDisplay ? "flex" : "hidden"
      } absolute inset-0 w-full h-screen items-center justify-center bg-gray20 z-50`}
    >
      <div className="inline-flex flex-col w-full justify-start pt-5 items-center mx-4 px-6 h-1/3 rounded-xl bg-white">
        <button
          type="button"
          className="w-full inline-flex items-center justify-end z-50"
          onClick={closeModal}
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="h-4 w-4 bg-squareGray p-3 rounded-full"
          />
        </button>
        <div className="absolute inset-0  w-full inline-flex flex-col items-center justify-center h-full z-40 px-10 mt-6">
          {isUpdateBiography ? (
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-gray60 h-20 w-20" />
          ) : (
            <>
              <Textarea
                placeholder="Bio."
                onChange={handleSetBiography}
                className="w-full mb-8"
              />
              <OrangeButton
                text={"Save"}
                  buttonAction={() => updateBiography(biography)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditBioModal;
