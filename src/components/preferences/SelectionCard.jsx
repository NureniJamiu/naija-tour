import {
    Card
} from "@/components/ui/card";
import { Check } from "lucide-react";

const SelectionCard = ({name, isActive, handleClick}) => {
    return (
      <Card
        className={`relative h-16 grid place-items-center hover:bg-green-400 rounded cursor-pointer px-2 min-w-44 ${isActive ? 'bg-green-400' : ''}`}
        onClick={() => handleClick(name)}
      >
        {isActive &&
            <div className="absolute top-1 right-1">
                <Check size={24} className="text-white" />
            </div>
        }
        {/* <CardContent className="bg-red-500"> */}
            <div className="flex items-center justify-center w-full h-full">
                <p >{name}</p>
            </div>
        {/* </CardContent> */}
      </Card>
    );
  };

export default SelectionCard;
