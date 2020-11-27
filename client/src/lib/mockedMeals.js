import meal1 from "../images/meal1.png";
import meal2 from "../images/meal2.png";
import meal3 from "../images/meal3.png";
import chef1 from "../images/profilePic.png";

const meals = [
    {
        id: 123,
        title: "4 specialty rolls",
        mealPic: meal1,
        price: 1000,
        servingSize: "2 people",
        cuisineType: "Japanese",
        ingredients: "rice, fish",
        chefName: "Atsushi Mikazuki",
        chefId: 899,
        chefPic: chef1,
        location: "Toronto, Canada",
    },
    {
        id: 456,
        title: "Hamburger",
        mealPic: meal2,
        price: 2500,
        servingSize: "1 person",
        cuisineType: "American",
        ingredients: "Bread, Beef",
        chefName: "Jane Doe",
        chefId: 123,
        chefPic: chef1,
        location: "Toronto, Canada",
    },
    {
        id: 789,
        title: "Grilled Cheese",
        price: 500,
        mealPic: meal3,
        chefName: "Jane Doe",
        chefId: 123,
        chefPic: chef1,
        location: "Toronto, Canada",
    },
];

export default meals;
