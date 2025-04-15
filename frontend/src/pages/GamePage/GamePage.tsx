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
        <section className="mx-auto mt-20 min-w-[1200px] max-w-[1200px] font-lexend">
            <span className="flex gap-8">
                <div className="flex w-full flex-col">
                    <img
                        src={`/PlayRates/assets/game-covers/${game?.id}.png`}
                        className="h-80 max-w-max rounded-md"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-4xl tracking-wide text-text-primary">
                        {game?.title}
                    </h2>
                    <p className="text-xl font-light text-text-secondary">
                        Released on{" "}
                        <span className="font-normal">
                            {game?.releaseDate && game?.releaseDate !== "TBA"
                                ? new Date(game?.releaseDate)
                                      .toDateString()
                                      .slice(4)
                                : "TBA"}
                        </span>
                    </p>
                    <p className="mt-5 line-clamp-[8] text-text-secondary">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Sapiente possimus voluptate iusto soluta quae
                        illum reprehenderit nisi, hic vitae at. Dignissimos
                        natus error molestias modi praesentium commodi
                        recusandae consequatur minus. Lorem ipsum dolor sit amet
                        consectetur, adipisicing elit. Sapiente possimus
                        voluptate iusto soluta quae illum reprehenderit nisi,
                        hic vitae at. Dignissimos natus error molestias modi
                        praesentium commodi recusandae consequatur minus. Lorem
                        ipsum dolor sit amet consectetur, adipisicing elit.
                        Sapiente possimus voluptate iusto soluta quae illum
                        reprehenderit nisi, hic vitae at. Dignissimos natus
                        error molestias modi praesentium commodi recusandae
                        consequatur minus. Lorem ipsum dolor sit amet
                        consectetur, adipisicing elit. Sapiente possimus
                        voluptate iusto soluta quae illum reprehenderit nisi,
                        hic vitae at. Dignissimos natus error molestias modi
                        praesentium commodi recusandae consequatur minus. Lorem
                        ipsum dolor sit amet consectetur, adipisicing elit.
                        Sapiente possimus voluptate iusto soluta quae illum
                        reprehenderit nisi, hic vitae at. Dignissimos natus
                        error molestias modi praesentium commodi recusandae
                        consequatur minus.
                    </p>
                </div>
            </span>
        </section>
    );
};

export default GamePage;
