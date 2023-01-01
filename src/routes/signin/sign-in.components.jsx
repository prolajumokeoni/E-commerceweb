import { signInWithGooglePopup, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const Signin = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		createUserDocumentFromAuth(user);
		const userDocRef = await createUserDocumentFromAuth(user);
	}


	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Signin with google popup</button>
		<SignUpForm /> 
		</div>
	)
}

export default Signin;