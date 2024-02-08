import { Button } from "@components/ui/button";

interface IOrangeButton {
    text: string;
    buttonAction?: () => void;
}

const OrangeButton = ({ text, buttonAction }: IOrangeButton) => {
  return (
    <Button variant="default" className="w-full h-12" onClick={buttonAction}>
      {text}
    </Button>
  );
};

export default OrangeButton;
