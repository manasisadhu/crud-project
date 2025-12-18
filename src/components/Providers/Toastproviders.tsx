import { useTheme } from "next-themes";
import { Bounce, ToastContainer } from "react-toastify";

const Toastproviders = () => {
	const { theme } = useTheme();
	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={1500}
				closeOnClick={false}
				theme={theme === "light" ? "light" : "dark"}
				transition={Bounce}
			/>
		</>
	);
};

export default Toastproviders;
