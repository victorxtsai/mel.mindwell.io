export default function VerifyEmail() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-3xl font-bold">Check your inbox</h1>
          <p className="text-gray-300">
            We’ve sent you a verification link. Please verify your email before signing in.
          </p>
          <p className="text-sm text-gray-500">Didn’t get it? Check your spam folder.</p>
        </div>
      </div>
    );
  }
  