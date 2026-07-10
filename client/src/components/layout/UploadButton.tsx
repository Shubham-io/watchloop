import { useNavigate } from "react-router-dom";
import { Button } from "@watchloop/components/ui/button";
import { Upload } from "lucide-react";

const UploadButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/upload");
  };

  return (
    <Button
      onClick={handleClick}
      className="flex items-center gap-2 w-8 h-8 bg-white text-black hover:bg-gray-100 hover:cursor-pointer"
    >
      <Upload className="h-4 w-4" />
      <span className="hidden lg:inline">Upload</span>
    </Button>
  );
};

export default UploadButton;
