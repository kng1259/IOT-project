import { Link } from 'react-router-dom'
import BgLogin from '../../assets/images/BgLogin.jpg'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'

function LoginPage() {
  const formSchema = Joi.object({
    email: Joi.string().required().pattern(EMAIL_RULE).messages({
      'string.empty': FIELD_REQUIRED_MESSAGE,
      'string.pattern.base': EMAIL_RULE_MESSAGE
    }),
    password: Joi.string().required().pattern(PASSWORD_RULE).messages({
      'string.empty': FIELD_REQUIRED_MESSAGE,
      'string.pattern.base': PASSWORD_RULE_MESSAGE
    })
  })

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: joiResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleLogin = (data) => {
    console.log(data);
  }
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
              Đăng nhập
            </h1>
            <form 
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit(handleLogin)}
            >
              <div>
                <label htmlFor="email" className="mb-2 block font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 outline-none"
                  placeholder="name@company.com"
                  {...register('email', {
                    value: 'email',
                  })}
                />
                <FieldErrorAlert errors={errors} fieldName={'email'} />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 block font-medium text-gray-900">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 outline-none"
                  {...register('password', {
                    value: 'password',
                  })}
                />
                <FieldErrorAlert errors={errors} fieldName={'password'} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="h-4 w-4 rounded border border-gray-300 bg-gray-50"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="remember" className="text-gray-500">
                      Ghi nhớ tài khoản
                    </label>
                  </div>
                </div>
                <Link className="text-primary-600 font-medium hover:underline">Quên mật khẩu?</Link>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-5 py-2.5 text-center font-medium text-white hover:bg-primary hover:shadow-inner hover:shadow-white focus:outline-none"
              >
                Đăng nhập
              </button>
              <p className="text-gray-500 text-center">
                <span>Chưa có tài khoản?</span>
                <Link to={'/register'} className="ml-1 font-medium hover:underline">
                  Đăng ký
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
