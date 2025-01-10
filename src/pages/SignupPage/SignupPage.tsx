import { FormEvent, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchUserByUsername, fetchUserByEmail } from "../../api";

const SignupPage = () => {
    // username and email taken text elements
    const usernameTakenText = useRef<HTMLParagraphElement>(null);
    const emailTakenText = useRef<HTMLParagraphElement>(null);

    // function to handle user signup on form submission
    const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // preventing page from refreshing

        // getting data from form inputs
        const data = new FormData(event.currentTarget);
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");
        const remember = data.get("remember");

        // checking if username is already used
        const fetchedUsername = await fetchUserByUsername(username!.toString());
        if (fetchedUsername) {
            usernameTakenText.current!.classList.remove("hidden");
        } else {
            if (!usernameTakenText.current!.classList.contains("hidden")) {
                usernameTakenText.current!.classList.add("hidden");
            }
        }

        // checking if email is already used
        const fetchedEmail = await fetchUserByEmail(email!.toString());
        if (fetchedEmail) {
            emailTakenText.current!.classList.remove("hidden");
        } else {
            if (!emailTakenText.current!.classList.contains("hidden")) {
                emailTakenText.current!.classList.add("hidden");
            }
        }
    };

    return (
        <form
            onSubmit={handleSignup}
            className="mx-auto mt-8 flex w-full max-w-[650px] flex-col justify-center rounded-lg bg-gradient-to-tl from-dropdownColor to-[#383838] px-5 py-10 font-ssp text-textColor shadow-md sm:px-12 sm:py-16 md:w-[630px] md:px-16"
        >
            <div className="text-center">
                <h2 className="text-4xl">Sign up for PlayRates</h2>
                <p className="mt-1 text-lg">
                    Create a free account or{" "}
                    <Link to="/login">
                        <span className="text-highlightPurple hover:text-highlightHover">
                            log in
                        </span>
                    </Link>
                </p>
            </div>
            <div className="mx-auto w-11/12 space-y-6 pt-12 sm:mx-0 sm:w-full sm:space-y-8">
                <div>
                    <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        className="w-full rounded-none border-b-[1px] border-textColor bg-transparent py-[6px] pl-[2px] focus:border-highlightPurple focus:outline-none"
                        required
                    />
                    <p
                        className="hidden pt-3 text-red-500"
                        ref={usernameTakenText}
                    >
                        Sorry that username is taken.
                    </p>
                </div>
                <div>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-none border-b-[1px] border-textColor bg-transparent py-[6px] pl-[2px] focus:border-highlightPurple focus:outline-none"
                        required
                    />
                    <p
                        className="hidden pt-3 text-red-500"
                        ref={emailTakenText}
                    >
                        Sorry that email is already being used.
                    </p>
                </div>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full rounded-none border-b-[1px] border-textColor bg-transparent py-[6px] pl-[2px] focus:border-highlightPurple focus:outline-none"
                    required
                />
            </div>
            <div className="mx-auto w-11/12 space-y-3 pt-10 sm:mx-0 sm:w-full md:pt-12">
                <button
                    type="submit"
                    className="w-full rounded bg-highlightPurple py-3 font-semibold transition-colors duration-300 hover:bg-highlightHover"
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
