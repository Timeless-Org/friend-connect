import { Button } from "@components/ui/button";

interface IOrangeButton {
    text: string;
  buttonAction?: () => void;
  disabled?: boolean;
}

const OrangeButton = ({ text, buttonAction, disabled = false }: IOrangeButton) => {
  return (
    <Button variant="default" className="w-full h-12" onClick={buttonAction} disabled={disabled}>
      {text}
    </Button>
  );
};

export default OrangeButton;
