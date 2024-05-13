import { TbFaceIdError } from "react-icons/tb";

const ErrorPage: React.FC = () => {
	return (
		<div className="h-screen border-2 flex items-center justify-center">
			<div className="flex flex-col items-center">
				<TbFaceIdError size={92} />
				<h1>Oops!</h1>
				<p>Sorry, an uxpected error has occured.</p>
				<p>
					<i className="font-bold text-2xl text-red-500">
                        404
					</i>
				</p>
			</div>
		</div>
	);
};

export default ErrorPage;
