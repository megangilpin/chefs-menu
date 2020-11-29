// TEMPORARY PAGE WITH RECIPES WILL BE REMOVED WHEN CHEF PROFILE PAGE IS CREATED
import React from "react";
import ResponsiveSideBar from "../components/ResponsiveSideBar";
import Main from "../components/Main";
import { Typography } from "@material-ui/core";
import MealCard from "../components/MealCard";
import meals from "../lib/mockedMeals";

function Meals(props) {
    return (
        <React.Fragment>
            <ResponsiveSideBar>
                <Typography>Responsive Side Bar</Typography>
            </ResponsiveSideBar>
            <Main>
                {meals.map((meal) => {
                    return (
                        <MealCard
                            key={meal.id}
                            id={meal.id}
                            mealPic={meal.mealPic}
                            title={meal.title}
                            price={meal.price}
                            chefName={meal.chefName}
                            chefId={meal.chefId}
                            chefPic={meal.chefPic}
                            location={meal.location}
                        />
                    );
                })}
            </Main>
        </React.Fragment>
    );
}

export default Meals;
