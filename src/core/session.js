import { removeDuplicates } from "../helper/removeDuplicates";

export const setUserLogged = (user) => {
    localStorage.setItem("userLogged", JSON.stringify(user));
};

export const getUserLogged = () => {
    const user = localStorage.getItem("userLogged");
    return JSON.parse(user);
};

export const deleteSession = async () => {
    localStorage.removeItem("userLogged");
};

export const setStatisticsUsers = async (data) => {
    let statisticsList = [];
    statisticsList.push(data);

    if (getStatisticsUsers()) {
        statisticsList = [...getStatisticsUsers(), ...statisticsList]
    }

    localStorage.setItem("statisticsUsers", JSON.stringify(statisticsList));
};

export const getStatisticsUsers = () => {
    const statistics = localStorage.getItem("statisticsUsers");
    const response = JSON.parse(statistics);
    return response ? removeDuplicates(response) : response;
};