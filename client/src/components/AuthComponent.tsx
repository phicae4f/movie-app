import { Button } from "../ui/Button";
import { CustomInput } from "../ui/CustomInput";
import { LogoComponent } from "./LogoComponent";
import { Icon } from "../ui/Icon";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  clearAuthError,
  getProfile,
  loginUser,
  registerUser,
} from "../store/slices/authSlice";

interface AuthComponentProps {
  mode: "login" | "register";
  onClose: () => void;
  onSwitchMode: () => void;
}

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  name: string;
  surname: string;
}

export const AuthComponent = ({
  mode,
  onClose,
  onSwitchMode,
}: AuthComponentProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AuthFormData>();
  const { isLoading, error, registerSuccess } = useAppSelector(
    (state) => state.auth
  );
  const password = watch("password");

  const onSubmit = (data: AuthFormData) => {
    dispatch(clearAuthError());

    if (mode === "register") {
      const { confirmPassword, ...credentials } = data;
      dispatch(registerUser(credentials));
      // .then((result) => {
      //   if (registerUser.fulfilled.match(result)) {
      //     dispatch(
      //       loginUser({
      //         email: data.email,
      //         password: data.password,
      //       })
      //     ).then((result) => {
      //       if (loginUser.fulfilled.match(result)) {
      //         onClose()
      //         dispatch(getProfile());
      //       }
      //     });
      //   }
      // });
    } else {
      dispatch(
        loginUser({
          email: data.email,
          password: data.password,
        })
      ).then((result) => {
        if (loginUser.fulfilled.match(result)) {
          onClose();
          dispatch(getProfile());
        }
      });
    }
  };

  if (mode === "register" && registerSuccess) {
    return (
      <div className="auth">
        <div className="auth__wrapper" onSubmit={handleSubmit(onSubmit)}>
          <button className="auth__close-btn" type="button" onClick={onClose}>
            <Icon name="icon-close" width={24} height={24} />
          </button>
          <div className="auth__logo">
            <LogoComponent
              width={133}
              height={30}
              imgSrc="/img/desktop/logo-img.png"
              imgSrcSet="/img/desktop/logo-img@2x.png"
            />
          </div>
          <h2 className="auth__title">Регистрация завершена</h2>
          {error && <span className="auth__error">{error}</span>}
          <p className="auth__text">
            Используйте вашу электронную почту для входа
          </p>

          <div className="auth__buttons">
            <button className="btn" type="button" onClick={onSwitchMode}>
              Войти
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth">
      {mode === "login" ? (
        <form className="auth__wrapper" onSubmit={handleSubmit(onSubmit)}>
          <button className="auth__close-btn" type="button" onClick={onClose}>
            <Icon name="icon-close" width={24} height={24} />
          </button>
          <div className="auth__logo">
            <LogoComponent
              width={133}
              height={30}
              imgSrc="/img/desktop/logo-img.png"
              imgSrcSet="/img/desktop/logo-img@2x.png"
            />
          </div>
          {error && <span className="auth__error">{error}</span>}
          <div className="auth__fields">
            <CustomInput
              iconName="icon-email"
              type="email"
              id="email-login"
              placeholder="Электронная почта"
              {...register("email", {
                required: "Поле обязательно",
              })}
              error={errors.email?.message}
            />
            <CustomInput
              iconName="icon-password"
              type="password"
              id="password-login"
              placeholder="Пароль"
              {...register("password", {
                required: "Поле обязательно",
              })}
              error={errors.password?.message}
            />
          </div>

          <div className="auth__buttons">
            <Button
              className="btn"
              type="submit"
              text={isLoading ? "Загрузка.." : "Войти"}
              disabled={isLoading}
            />
            <button
              className="auth__link-btn"
              type="button"
              onClick={onSwitchMode}
            >
              Регистрация
            </button>
          </div>
        </form>
      ) : (
        <form className="auth__wrapper" onSubmit={handleSubmit(onSubmit)}>
          <button className="auth__close-btn" type="button" onClick={onClose}>
            <Icon name="icon-close" width={24} height={24} />
          </button>
          <div className="auth__logo">
            <LogoComponent
              width={133}
              height={30}
              imgSrc="/img/desktop/logo-img.png"
              imgSrcSet="/img/desktop/logo-img@2x.png"
            />
          </div>
          <h2 className="auth__title">Регистрация</h2>
          {error && <span className="auth__error">{error}</span>}
          <div className="auth__fields">
            <CustomInput
              iconName="icon-email"
              type="email"
              id="email-register"
              placeholder="Электронная почта"
              {...register("email", {
                required: "Обязательное поле",
              })}
              error={errors.email?.message}
            />
            <CustomInput
              iconName="icon-user"
              type="text"
              id="name-register"
              placeholder="Имя"
              {...register("name", {
                required: "Обязательное поле",
              })}
              error={errors.name?.message}
            />
            <CustomInput
              iconName="icon-user"
              type="text"
              id="lastname-register"
              placeholder="Фамилия"
              {...register("surname", {
                required: "Обязательное поле",
              })}
              error={errors.surname?.message}
            />
            <CustomInput
              iconName="icon-password"
              type="password"
              id="password-register"
              placeholder="Пароль"
              {...register("password", {
                required: "Обязательное поле",
              })}
              error={errors.password?.message}
            />
            <CustomInput
              iconName="icon-password"
              type="password"
              id="repeat-password-register"
              placeholder="Подтвердите пароль"
              {...register("confirmPassword", {
                required: "Обязательное поле",
                validate: (value) =>
                  value === password || "Пароли не совпадают",
              })}
              error={errors.confirmPassword?.message}
            />
          </div>

          <div className="auth__buttons">
            <Button
              className="btn"
              type="submit"
              text={isLoading ? "Загрузка.." : "Создать аккаунт"}
              disabled={isLoading}
            />
            <button
              className="auth__link-btn"
              type="button"
              onClick={onSwitchMode}
            >
              У меня есть пароль
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
