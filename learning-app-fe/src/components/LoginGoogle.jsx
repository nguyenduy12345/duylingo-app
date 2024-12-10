import { GoogleLogin } from "@react-oauth/google"

const LoginGoogle = () => {
    const handleLoginSuccess = (response) => {
        console.log('Login Success:', response);
        // Xử lý thông tin người dùng từ response.credential
      };
    
      const handleLoginFailure = (error) => {
        console.error('Login Failed:', error);
      };
  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onFailure={handleLoginFailure}
      render={(renderProps) => (
        <div
          onClick={renderProps.onClick}
          className="flex cursor-pointer justify-center bg-[#dfe8e7] p-3 font-noto font-medium hover:text-white md:mr-1 md:w-1/2"
        >
          <img
            src="images/logo/googlelogo.png"
            className="lazyload mr-2 h-6 w-6"
          />
          Đăng nhập bằng Google
        </div>
      )}
    />
  );
}

export default LoginGoogle
