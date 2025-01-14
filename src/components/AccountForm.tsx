import { FormEvent, useEffect, useRef, useState } from "react";
import { fetchUserByUsername, fetchUserByEmail } from "../api";

interface FormProps {
    formType: "signup" | "login";
    closeAccountForm: () => void;
    openSignupForm: () => void;
    openLoginForm: () => void;
}

const AccountForm: React.FC<FormProps> = ({
    formType,
    closeAccountForm,
    openSignupForm,
    openLoginForm,
}) => {
    // username and email taken text elements
    const usernameErrorText = useRef<HTMLParagraphElement>(null);
    const emailErrorText = useRef<HTMLParagraphElement>(null);
    const passwordErrorText = useRef<HTMLParagraphElement>(null);

    // form and backdrop elements
    const formElement = useRef<HTMLFormElement>(null);
    const formBackdrop = useRef<HTMLDialogElement>(null);

    // password hidden or show setting
    const [passwordHide, setPasswordHide] = useState<Boolean>(true);

    // checking for ESC key press to close form
    useEffect(() => {
        const keyCheck = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeAccountForm();
            }
        };

        document.addEventListener("keydown", keyCheck);

        // removing key event listener when form is closed
        return () => {
            document.removeEventListener("keydown", keyCheck);
        };
    }, []);

    // function to handle user signup on form submission
    const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // preventing page from refreshing
        let errored = false; // set to true if any of inputs causes error, to return after all checks

        // getting data from form inputs
        const data = new FormData(event.currentTarget);
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");
        const remember = data.get("remember");

        // checking if username is already used in signup
        // or if username exists in login
        const fetchedUsername = await fetchUserByUsername(username!.toString());
        if (fetchedUsername) {
            // user already exists - signup
            if (formType === "signup") {
                usernameErrorText.current!.classList.remove("hidden");
                errored = true;
            } else {
                if (!usernameErrorText.current!.classList.contains("hidden")) {
                    usernameErrorText.current!.classList.add("hidden");
                }
            }
        } else {
            // username doesnt exist - login
            if (formType === "login") {
                usernameErrorText.current!.classList.remove("hidden");
                errored = true;
            } else {
                if (!usernameErrorText.current!.classList.contains("hidden")) {
                    usernameErrorText.current!.classList.add("hidden");
                }
            }
        }

        // checking if email is already used in signup
        if (email) {
            const fetchedEmail = await fetchUserByEmail(email.toString());
            if (fetchedEmail) {
                emailErrorText.current!.classList.remove("hidden");
                errored = true;
            } else {
                if (!emailErrorText.current!.classList.contains("hidden")) {
                    emailErrorText.current!.classList.add("hidden");
                }
            }
        }

        // checking if password is long enough for signup
        // or if password is correct for login
        if (formType === "signup") {
            // password length less that 8 characters - signup
            if (password!.toString().length < 8) {
                console.log(password);
                passwordErrorText.current!.classList.remove("hidden");
                errored = true;
            } else {
                if (!passwordErrorText.current!.classList.contains("hidden")) {
                    passwordErrorText.current!.classList.add("hidden");
                }
            }
        } else {
            if (fetchedUsername) {
                // incorrect pasword - login
                if (password!.toString() !== fetchedUsername.password) {
                    passwordErrorText.current!.classList.remove("hidden");
                } else {
                    if (
                        !passwordErrorText.current!.classList.contains("hidden")
                    ) {
                        passwordErrorText.current!.classList.add("hidden");
                    }
                }
            }
        }

        // exit function if any of inputs caused error
        if (errored) {
            return;
        }
    };

    return (
        <dialog
            className={`fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-[#00000066] px-3`}
            ref={formBackdrop}
            onMouseDown={closeAccountForm}
        >
            <form
                onSubmit={handleSignup}
                onMouseDown={(event) => event.stopPropagation()}
                className="relative mx-auto flex w-full max-w-[650px] flex-col justify-center rounded-lg bg-gradient-to-tl from-dropdownColor to-[#383838] px-5 py-12 font-ssp text-textColor shadow-md sm:px-12 sm:py-16 md:w-[630px] md:px-16"
                ref={formElement}
            >
                <div className="text-center">
                    <h2 className="text-4xl">
                        {formType === "signup"
                            ? "Sign up for PlayRates"
                            : "Log in to PlayRates"}
                    </h2>
                    <p className="mt-1 text-lg">
                        {formType === "signup"
                            ? "Create a free account or"
                            : "Not a member?"}{" "}
                        <span
                            onClick={
                                formType === "signup"
                                    ? openLoginForm
                                    : openSignupForm
                            }
                            className="text-highlightPurple transition-colors duration-200 hover:cursor-pointer hover:text-highlightHover"
                        >
                            {formType === "signup" ? "log in" : "Sign up"}
                        </span>
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
                            ref={usernameErrorText}
                        >
                            {formType === "signup"
                                ? "Sorry that username is taken."
                                : "Username does not exist."}
                        </p>
                    </div>
                    {formType === "signup" ? (
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
                                ref={emailErrorText}
                            >
                                Sorry that email is already being used.
                            </p>
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="relative">
                        <input
                            name="password"
                            type={passwordHide ? "password" : "text"}
                            placeholder="Password"
                            className="w-full rounded-none border-b-[1px] border-textColor bg-transparent py-[6px] pl-[2px] focus:border-highlightPurple focus:outline-none"
                            required
                        />
                        <p
                            className="hidden pt-3 text-red-500"
                            ref={passwordErrorText}
                        >
                            {formType === "signup"
                                ? "Password needs to be atleast 8 characters long."
                                : "Password is incorrect."}
                        </p>
                        <i
                            className={`fa-regular ${passwordHide ? "fa-eye" : "fa-eye-slash"} absolute ${passwordHide ? "right-3" : "right-[11px]"} top-2 hover:cursor-pointer hover:text-highlightPurple`}
                            onClick={() => setPasswordHide(!passwordHide)}
                            title={passwordHide ? "Show" : "Hide"}
                        ></i>
                    </div>
                </div>
                <div className="mx-auto w-11/12 space-y-3 pt-10 sm:mx-0 sm:w-full md:pt-12">
                    <button
                        type="submit"
                        className="w-full rounded bg-highlightPurple py-3 font-semibold transition-colors duration-300 hover:bg-highlightHover"
                    >
                        {formType === "signup" ? "Sign up" : "Log in"}
                    </button>
                    <div className="flex w-full items-center justify-between">
                        <div className="flex flex-row items-center gap-x-[6px]">
                            <input name="remember" type="checkbox" />
                            <p>Remember me</p>
                        </div>
                        {formType === "login" ? (
                            <p className="text-highlightPurple transition-colors duration-200 hover:cursor-pointer hover:text-highlightHover">
                                Forgot password?
                            </p>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                {/* Close form button (X) */}
                <i
                    className="fas fa-xmark absolute right-[14px] top-3 px-1 text-2xl transition-colors duration-200 hover:cursor-pointer hover:text-highlightPurple sm:right-5 sm:top-4 sm:text-3xl"
                    onClick={closeAccountForm}
                ></i>
            </form>
        </dialog>
    );
};

export default AccountForm;
