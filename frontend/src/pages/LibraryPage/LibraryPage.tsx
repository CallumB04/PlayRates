const LibraryPage = () => {
    return (
        <section className="flex w-full flex-col gap-5 lg:h-[85vh] lg:flex-row">
            <aside className="card h-full w-full lg:hidden xl:flex xl:w-1/4 2xl:w-1/5">
                <h2 className="card-header-text">Filters</h2>
            </aside>
            <div className="card w-full xl:w-3/4 2xl:w-4/5">
                <h2 className="card-header-text">Game Library</h2>
            </div>
        </section>
    );
};

export default LibraryPage;
