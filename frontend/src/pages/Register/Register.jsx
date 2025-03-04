import { Link } from 'react-router-dom'
import BgLogin from '../../assets/images/BgLogin.jpg'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'

function RegisterPage() {
  const formSchema = Joi.object({
    email: Joi.string().required().pattern(EMAIL_RULE).messages({
      'string.empty': FIELD_REQUIRED_MESSAGE,
      'string.pattern.base': EMAIL_RULE_MESSAGE
    }),
    password: Joi.string().required().pattern(PASSWORD_RULE).messages({
      'string.empty': FIELD_REQUIRED_MESSAGE,
      'string.pattern.base': PASSWORD_RULE_MESSAGE
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
      'string.empty': FIELD_REQUIRED_MESSAGE,
      'string.pattern.base': PASSWORD_RULE_MESSAGE,
      'any.only': 'Mật khẩu xác nhận không trùng khớp!'
    })
  })

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const handleSignup = (data) => {
    console.log(data)
  }

  return (
    <section
      className="bg-gray-50"
      style={{
        backgroundImage: `url(${BgLogin})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="mx-auto flex flex-col items-center justify-center bg-gray-700 bg-opacity-70 px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="d mb-12 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Tạo tài khoản
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(handleSignup)}>
              <div>
                <label htmlFor="email" className="d mb-2 block font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 outline-none"
                  placeholder="Vd: name@company.com"
                  {...register('email', {
                    value: 'email'
                  })}
                />
                <FieldErrorAlert errors={errors} fieldName={'email'} />
              </div>

              <div>
                <label htmlFor="password" className="d mb-2 block font-medium text-gray-900">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="d block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 outline-none"
                  {...register('password', {
                    value: 'password'
                  })}
                />
                <FieldErrorAlert errors={errors} fieldName={'password'} />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="d mb-2 block font-medium text-gray-900">
                  Xác nhận Mật khẩu
                </label>
                <input
                  type="confirm-password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 outline-none"
                  {...register('confirmPassword', {
                    value: 'confirmPassword'
                  })}
                />
                <FieldErrorAlert errors={errors} fieldName={'confirmPassword'} />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-5 py-2.5 text-center font-medium text-white outline-none hover:shadow-inner hover:shadow-white"
              >
                Tạo tài khoản
              </button>
              <p className="text-center text-gray-500">
                Đã có tài khoản?{' '}
                <Link to={'/login'} className="ml-1 font-medium hover:underline">
                  Đăng nhập
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage
