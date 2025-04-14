import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameById, Game } from "../../api";

const GamePage = () => {
    const { gameID } = useParams(); // getting game id from URL
    const [game, setGame] = useState<Game | undefined>(undefined);

    useEffect(() => {
        const loadGameByID = async () => {
            // fetching game with given ID
            const fetchedGame = await fetchGameById(Number(gameID));

            // sets game in state when fetched
            if (fetchedGame) {
                setGame(fetchedGame);
            }
        };

        loadGameByID();
    }, []);

    return (
        <section className="mx-auto mt-20 min-w-[1200px] max-w-[1200px]"></section>
    );
};

export default GamePage;
