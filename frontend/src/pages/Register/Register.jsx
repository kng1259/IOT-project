import { Link } from 'react-router-dom';
import BgLogin from '../../assets/images/BgLogin.jpg';

function RegisterPage() {
    return (
        <section
            className="bg-gray-50"
            style={{
                backgroundImage: `url(${BgLogin})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="mx-auto flex flex-col items-center justify-center bg-gray-700 bg-opacity-70 px-6 py-8 md:h-screen lg:py-0">
                <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
                    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                        <h1 className="d mb-12 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="d mb-2 block font-medium text-gray-900">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 outline-none"
                                    placeholder="name@company.com"
                                    required=""
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="d mb-2 block font-medium text-gray-900">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="d block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 outline-none"
                                    required=""
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="d mb-2 block font-medium text-gray-900">
                                    Confirm password
                                </label>
                                <input
                                    type="confirm-password"
                                    name="confirm-password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 outline-none"
                                    required=""
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-primary px-5 py-2.5 text-center font-medium text-white outline-none hover:shadow-inner hover:shadow-white"
                            >
                                Create an account
                            </button>
                            <p className="text-gray-500">
                                Already have an account ?{' '}
                                <Link to={'/login'} className="ml-1 font-medium hover:underline">
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RegisterPage;
