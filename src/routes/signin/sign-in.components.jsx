import { signInWithGooglePopup, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

const Signin = () => {
	const logGoogleUser = async () => {
		const {user} = await signInWithGooglePopup();
		createUserDocumentFromAuth(user);
		const userDocRef = await createUserDocumentFromAuth(user);
	}


	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Signin with google popup</button>
		</div>
	)
}

export default Signin;