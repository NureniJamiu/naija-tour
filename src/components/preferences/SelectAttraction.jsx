'use client';
import { usePreferences } from "@/context/preferencesContext";
import { setAttractionTypes } from "@/redux/userPreferencesSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import SelectionCard from "./SelectionCard";

const attractions = [
    "Nature",
    "Wildlife",
    "Adventure",
    "Culture",
    "History",
    "Architecture",
    "Beach",
    "Eco-tourism",
    "Art",
    "Waterfall",
    "Mountain",
    "Urban",
    "Religious/spiritual",
];

const SelectAttraction = () => {
    const [selectedAttractions, setSelectedAttractions] = useState([]);
    const { updatePreference } = usePreferences();
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSelection = (name) => {
        setSelectedAttractions(prev => {
            const newSelection = prev.includes(name)
                ? prev.filter(item => item !== name)
                : [...prev, name];

            console.log("Updated selection:", newSelection);
            updatePreference('destination', newSelection);
            return newSelection;
        });
    };

    const handleNext = () => {
        dispatch(setAttractionTypes(selectedAttractions));
        console.log("Attraction types updated in Redux store");

        router.push('/preferences/select-activity');
    };

    return (
        <>
            <div className="mt-8">
                <p className="text-sm text-gray-600">Finish setting up your profile for personalized recommendations.</p>
                <h2 className="text-2xl my-2">What type of attractions do you like?</h2>
                <span className="text-sm text-gray-700">Select all that applies</span>
            </div>
            <div className="grid grid-cols-4 mt-5 gap-3">
                {attractions.map(attraction => (
                    <SelectionCard
                        key={attraction}
                        name={attraction}
                        isActive={selectedAttractions.includes(attraction)}
                        handleClick={() => handleSelection(attraction)}
                    />
                ))}
            </div>
            <div className="mt-2 w-full flex justify-end">
                <Button onClick={handleNext}>Next</Button>
            </div>
        </>
    );
};

export default SelectAttraction;
