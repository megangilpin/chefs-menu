import { useState } from "react";

export default function useCuisineSelector() {
    const ALL = "ALL";
    const allCuisines = [
        "AMERICAN",
        "BRITISH",
        "CARIBBEAN",
        "CHINESE",
        "FRENCH",
        "GREEK",
        "INDIAN",
        "ITALIAN",
        "MEDITERRANEAN",
        "MEXICAN",
        "MORROCAN",
        "SPANISH",
        "THAI",
        "TURKISH",
        "VIETNAMESE",
    ];
    const [cuisines, setCuisines] = useState(new Set([ALL]));
    const [availableCuisines, setAvailableCuisines] = useState(new Set(allCuisines));

    const removeCuisine = (cuisine) => {
        const newCuisines = new Set(cuisines);
        const newAvailableCuisines = new Set(availableCuisines);
        newCuisines.delete(cuisine);
        newAvailableCuisines.add(cuisine);
        if (newCuisines.size === 0) {
            newCuisines.add(ALL);
        }
        setCuisines(newCuisines);
        setAvailableCuisines(newAvailableCuisines);
    };

    const addCuisine = (cuisine) => {
        if (cuisine === ALL) {
            setCuisines(new Set([ALL]));
            setAvailableCuisines(new Set(allCuisines));
        } else {
            const newCuisines = new Set(cuisines);
            const newAvailableCuisines = new Set(availableCuisines);
            newCuisines.add(cuisine);
            newAvailableCuisines.delete(cuisine);
            if (newCuisines.has(ALL)) {
                newCuisines.delete(ALL);
                newAvailableCuisines.add(ALL);
            }
            setCuisines(newCuisines);
            setAvailableCuisines(newAvailableCuisines);
        }
    };

    return { cuisines, availableCuisines, addCuisine, removeCuisine, ALL };
}
