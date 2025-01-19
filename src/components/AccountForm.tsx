import { FormEvent, useEffect, useRef, useState } from "react";
import {
    fetchUserByUsername,
    fetchUserByEmail,
    addNewUser,
    UserCreation,
} from "../api";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

interface FormProps {
    formType: "signup" | "login";
    closeAccountForm: () => void;
    openSignupForm: () => void;
    openLoginForm: () => void;
    loadUserByID: (id: number) => Promise<void>;
}

const AccountForm: React.FC<FormProps> = ({
    formType,
    closeAccountForm,
    openSignupForm,
    openLoginForm,
    loadUserByID,
}) => {
    // form input elements
    const usernameInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    // form input error message elements
    const usernameErrorText = useRef<HTMLParagraphElement>(null);
    const emailErrorText = useRef<HTMLParagraphElement>(null);
    const passwordErrorText = useRef<HTMLParagraphElement>(null);

    // form and backdrop elements
    const formElement = useRef<HTMLFormElement>(null);
    const formBackdrop = useRef<HTMLDialogElement>(null);

    // password hidden or show setting
    const [passwordHide, setPasswordHide] = useState<Boolean>(true);

    // whether api is loading - display loading spinner
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    // username to pass from signup to login
    const [usernameAfterSignup, setUsernameAfterSignup] = useState<string>("");

    // whether form response should show (successful account or failed)
    const [showResponse, setShowResponse] = useState<Boolean>(false);

    const navigate = useNavigate();

    // function for hiding error message if not already hidden
    const hideErrorMessage = (msg: React.RefObject<HTMLParagraphElement>) => {
        if (!msg.current?.classList.contains("hidden")) {
            msg.current?.classList.add("hidden");
        }
    };

    // clearing inputs and error messages on form change
    useEffect(() => {
        // hiding error messages
        hideErrorMessage(usernameErrorText);
        hideErrorMessage(emailErrorText);
        hideErrorMessage(passwordErrorText);

        // removing input values
        usernameInput.current!.value = "";
        if (emailInput.current) {
            emailInput.current.value = "";
        }
        passwordInput.current!.value = "";

        // if valid signup
        if (usernameAfterSignup) {
            // if user returns to signup again, remove username from input
            if (formType === "signup") {
                setUsernameAfterSignup("");
            }

            // setting username and displaying success message
            usernameInput.current!.value = usernameAfterSignup;
            setShowResponse(true);
        } else {
            setShowResponse(false);
        }
    }, [formType, usernameAfterSignup]);

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
    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // preventing page from refreshing
        let errored = false; // set to true if any of inputs causes error, to return after all checks
        setIsLoading(true); // display loading spinner and prevent interaction with backdrop

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
                hideErrorMessage(usernameErrorText);
            }
        } else {
            // username doesnt exist - login
            if (formType === "login") {
                usernameErrorText.current!.classList.remove("hidden");
                errored = true;
            } else {
                hideErrorMessage(usernameErrorText);
            }
        }

        // checking if email is already used in signup
        if (email) {
            const fetchedEmail = await fetchUserByEmail(email.toString());
            if (fetchedEmail) {
                emailErrorText.current!.classList.remove("hidden");
                errored = true;
            } else {
                hideErrorMessage(emailErrorText);
            }
        }

        // checking if password is long enough for signup
        // or if password is correct for login
        if (formType === "signup") {
            // password length less that 8 characters - signup
            if (password!.toString().length < 8) {
                passwordErrorText.current!.classList.remove("hidden");
                errored = true;
            } else {
                hideErrorMessage(passwordErrorText);
            }
        } else {
            if (fetchedUsername) {
                // incorrect pasword - login
                if (password!.toString() !== fetchedUsername.password) {
                    passwordErrorText.current!.classList.remove("hidden");
                    passwordInput.current!.value = "";
                    errored = true;
                } else {
                    hideErrorMessage(passwordErrorText);
                }
            } else {
                hideErrorMessage(passwordErrorText);
            }
        }

        // exit function if any of inputs caused error
        if (errored) {
            setIsLoading(false);
            return;
        }

        // creating new account if signup
        if (formType === "signup") {
            // defining user structure
            const newUser: UserCreation = {
                username: usernameInput.current!.value,
                email: emailInput.current!.value,
                password: passwordInput.current!.value,
            };

            // calling api function to add new user
            addNewUser(newUser)
                .then(() => {
                    setUsernameAfterSignup(newUser.username);
                    openLoginForm();
                })
                .catch(() => {
                    setShowResponse(true);
                })
                .finally(() => {
                    // remove loading spinner once complete
                    setIsLoading(false);
                });
        }
        // logging into account
        else {
            const user = await fetchUserByUsername(
                usernameInput.current!.value
            );

            if (user) {
                // add to local storage if user selects remember me
                if (remember) {
                    localStorage.setItem("user_id", String(user.id));
                }

                loadUserByID(user.id); // load new user into context
                navigate("/"); // return user to home page
                closeAccountForm(); // close the login form
            }
        }
    };

    return (
        <dialog
            className={`fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-[#00000066] px-3`}
            ref={formBackdrop}
            onMouseDown={closeAccountForm}
        >
            <form
                onSubmit={handleFormSubmit}
                onMouseDown={(event) => event.stopPropagation()}
                className="relative mx-auto flex w-full max-w-[650px] flex-col justify-center rounded-lg bg-gradient-to-tl from-dropdownColor to-[#383838] px-2 py-12 font-ssp text-textColor shadow-md sm:px-12 sm:py-16 md:w-[630px] md:px-16"
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
                    {showResponse ? (
                        <p
                            className={`mx-auto mt-5 w-max rounded ${formType === "login" ? "bg-green-200" : "bg-red-200"} px-5 py-2 ${formType === "login" ? "bg-green-600" : "bg-red-600"} opacity-80`}
                        >
                            {formType === "login"
                                ? "Your account has been successfully created!"
                                : "Something went wrong. Please try again."}
                        </p>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="mx-auto w-11/12 space-y-6 pt-12 sm:mx-0 sm:w-full sm:space-y-8">
                    <div>
                        <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            className="w-full rounded-lg border-[1px] border-[#f3f3f377] bg-transparent py-[14px] pl-3 focus:border-highlightPurple focus:outline-none sm:rounded-none sm:border-0 sm:border-b-[1px] sm:border-textColor sm:py-[6px] sm:pl-[2px]"
                            required
                            ref={usernameInput}
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
                                className="w-full rounded-lg border-[1px] border-[#f3f3f377] bg-transparent py-[14px] pl-3 focus:border-highlightPurple focus:outline-none sm:rounded-none sm:border-0 sm:border-b-[1px] sm:border-textColor sm:py-[6px] sm:pl-[2px]"
                                required
                                ref={emailInput}
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
                            className="w-full rounded-lg border-[1px] border-[#f3f3f377] bg-transparent py-[14px] pl-3 pr-11 focus:border-highlightPurple focus:outline-none sm:rounded-none sm:border-0 sm:border-b-[1px] sm:border-textColor sm:py-[6px] sm:pl-[2px] sm:pr-10"
                            required
                            ref={passwordInput}
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
                            className={`fa-regular ${passwordHide ? "fa-eye" : "fa-eye-slash"} absolute ${passwordHide ? "right-3" : "right-[11px]"} top-[14px] mr-1 text-xl transition-colors duration-100 hover:cursor-pointer hover:text-highlightPurple sm:top-2 sm:mr-0 sm:text-base`}
                            onClick={() => setPasswordHide(!passwordHide)}
                            title={passwordHide ? "Show" : "Hide"}
                        ></i>
                    </div>
                </div>
                <div className="mx-auto w-11/12 space-y-3 pt-6 sm:mx-0 sm:w-full sm:pt-10 md:pt-12">
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-highlightPurple py-3 font-semibold transition-colors duration-300 hover:bg-highlightHover sm:rounded"
                    >
                        {formType === "signup" ? "Sign up" : "Log in"}
                    </button>
                    {formType === "login" ? (
                        <div className="flex w-full items-center justify-between">
                            <div className="flex flex-row items-center gap-x-[6px]">
                                <input name="remember" type="checkbox" />
                                <p>Remember me</p>
                            </div>

                            <p className="text-highlightPurple transition-colors duration-200 hover:cursor-pointer hover:text-highlightHover">
                                Forgot password?
                            </p>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                {/* Close form button (X) */}
                <i
                    className="fas fa-xmark absolute right-[14px] top-3 px-1 text-2xl transition-colors duration-200 hover:cursor-pointer hover:text-highlightPurple sm:right-5 sm:top-4 sm:text-3xl"
                    onClick={closeAccountForm}
                ></i>
                {isLoading ? (
                    <dialog className="flex size-full items-center justify-center rounded-lg bg-[#00000077]">
                        <LoadingSpinner size={10} />
                    </dialog>
                ) : (
                    <></>
                )}
            </form>
        </dialog>
    );
};

export default AccountForm;
