import { FormEvent } from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
    // function to handle user signup on form submission
    const handleSignup = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // preventing page from refreshing

        // getting data from form inputs
        const data = new FormData(event.currentTarget);
    };

    return (
        <form
            onSubmit={handleSignup}
            className="mx-auto mt-8 flex w-full max-w-[650px] flex-col justify-center rounded-lg bg-dropdownColor px-5 py-16 font-ssp text-textColor shadow-md sm:px-12 md:w-[630px] md:px-16"
        >
            <div className="text-center">
                <h2 className="text-4xl">Sign up for PlayRates</h2>
                <p className="mt-1 text-lg">
                    Create a free account or{" "}
                    <Link to="/login">
                        <span className="hover:text-highlightHover text-highlightPurple">
                            log in
                        </span>
                    </Link>
                </p>
            </div>
            <div className="space-y-6 pt-12 sm:space-y-8">
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="w-full rounded-none border-b-[1px] border-textColor bg-transparent py-[6px] pl-[2px] focus:border-highlightPurple focus:outline-none"
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-none border-b-[1px] border-textColor bg-transparent py-[6px] pl-[2px] focus:border-highlightPurple focus:outline-none"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full rounded-none border-b-[1px] border-textColor bg-transparent py-[6px] pl-[2px] focus:border-highlightPurple focus:outline-none"
                />
            </div>
            <div className="space-y-3 pt-10 md:pt-12">
                <button
                    type="submit"
                    name="submit"
                    className="hover:bg-highlightHover w-full rounded bg-highlightPurple py-3 transition-colors duration-300"
                >
                    Sign up
                </button>
                <div className="flex flex-row items-center gap-x-[6px]">
                    <input name="remember" type="checkbox" />
                    <p>Remember me</p>
                </div>
            </div>
        </form>
    );
};

export default SignupPage;
