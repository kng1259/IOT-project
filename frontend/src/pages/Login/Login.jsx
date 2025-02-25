import { Link } from 'react-router-dom';
import BgLogin from '../../assets/images/BgLogin.jpg';

function LoginPage() {
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
                        <h1 className="mb-12 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="mb-2 block font-medium text-gray-900">
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
                                <label htmlFor="password" className="mb-2 block font-medium text-gray-900">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 outline-none"
                                    required=""
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex h-5 items-center">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border border-gray-300 bg-gray-50"
                                            required=""
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <label htmlFor="remember" className="text-gray-500">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <Link className="text-primary-600 font-medium hover:underline">Forgot password?</Link>
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-primary px-5 py-2.5 text-center font-medium text-white hover:bg-primary hover:shadow-inner hover:shadow-white focus:outline-none"
                            >
                                Sign in
                            </button>
                            <p className="text-gray-500">
                                Don’t have an account yet ?{' '}
                                <Link to={'/register'} className="ml-1 font-medium hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;
