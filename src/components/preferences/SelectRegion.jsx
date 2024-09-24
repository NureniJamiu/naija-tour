'use client';
import { addUserPreference } from "@/app/actions/preference";
import { usePreferences } from "@/context/preferencesContext";
import { setRegionTypes } from "@/redux/userPreferencesSlice";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import SelectionCard from "./SelectionCard";

const regions = [
    "North",
    "North-East",
    "East",
    "South-East",
    "South",
    "South-West",
    "West",
    "North-West"
  ];

  const SelectRegion = () => {
    const userPreferences = useSelector(state => state.userPreferences);
    const { user } = useUser();
    const [selectedRegion, setSelectedRegion] = useState([]);
    const { updatePreference } = usePreferences();
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSelection = (name) => {
        setSelectedRegion(prev => {
            const newSelection = prev.includes(name)
                ? prev.filter(item => item !== name)
                : [...prev, name];

            // console.log("Updated selection:", newSelection);
            updatePreference('destination', newSelection);
            return newSelection;
        });
    };

    const handleNext = async () => {
        // console.log("Selected Region: ", selectedRegion);
        dispatch(setRegionTypes(selectedRegion));
        try {
            await addUserPreference({
                userId: user.id,
                activityTypes: userPreferences.activityTypes,
                attractionTypes: userPreferences.attractionTypes,
                regionTypes: selectedRegion
            });
            router.push('/');
        } catch (error) {
            console.error("Error saving user preferences:", error);
            // Handle error (- show an error message to the user
        }
    };

    return (
        <>
            <div>
                <h2 className="text-2xl my-2">Are you interested in any specific regions of Nigeria?</h2>
                <span className="text-sm text-gray-700">Select all that applies</span>
            </div>
            <div className="grid grid-cols-4 mt-5 gap-3">
                {regions.map(region => (
                    <SelectionCard
                        key={region}
                        name={region}
                        isActive={selectedRegion.includes(region)}
                        handleClick={() => handleSelection(region)}
                    />
                ))}
            </div>
            <div className="mt-2 w-full flex justify-end">
                <Button onClick={handleNext}>Next</Button>
            </div>
        </>
    );
};

export default SelectRegion;
