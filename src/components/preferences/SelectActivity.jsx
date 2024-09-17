'use client';
import { usePreferences } from "@/context/preferencesContext";
import { setActivityTypes } from "@/redux/userPreferencesSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import SelectionCard from "./SelectionCard";

const activities = [
    "Nature",
    "Adventure",
    "Leisure",
    "Culture",
    "History",
    "Art",
    "Architecture",
];

const SelectActivity = () => {
    const [selectedActivity, setSelectedActivity] = useState([]);
    const { updatePreference } = usePreferences();
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSelection = (name) => {
        setSelectedActivity(prev => {
            const newSelection = prev.includes(name)
                ? prev.filter(item => item !== name)
                : [...prev, name];

            // console.log("Updated selection:", newSelection);
            updatePreference('destination', newSelection);
            return newSelection;
        });
    };

    const handleNext = () => {
        dispatch(setActivityTypes(selectedActivity));
        // console.log("Activity types updated in Redux store");

        router.push('/preferences/select-region');
    };

    return (
        <>
            <div>
                <h2 className="text-2xl my-2">What type of activities are you interested in?</h2>
                <span className="text-sm text-gray-700">Select all that applies</span>
            </div>
            <div className="grid grid-cols-4 mt-5 gap-3">
                {activities.map(activity => (
                    <SelectionCard
                        key={activity}
                        name={activity}
                        isActive={selectedActivity.includes(activity)}
                        handleClick={() => handleSelection(activity)}
                    />
                ))}
            </div>
            <div className="mt-2 w-full flex justify-end">
                <Button onClick={handleNext}>Next</Button>
            </div>
        </>
    );
};

export default SelectActivity;
