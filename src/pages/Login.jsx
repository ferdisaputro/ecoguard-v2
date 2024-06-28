function Login () {
   return (
      <div className="h-[100vh]">
         <div className="grid grid-cols-2 h-full">
            <div className="relative">
               <img src="/assets/login.png" className="object-cover object-center h-[100vh] w-full block opacity-70" alt=""></img>
               <div className="absolute top-0 left-0 right-0 bottom-0 w-3/4 m-auto py-16">
                  <h1 className="font-semibold text-5xl">LOGIN</h1>
                  <p className="mt-5">EcoGuard Service</p>
               </div>
            </div>
            <div className="relative grid place-items-center p-10 w-full xl:w-3/4 mx-auto">
               <form action="/" method="get" className="w-full space-y-4">
                  <div className="flex flex-col">
                     <label for="username" className="text-sm text-gray-300">Username/email</label>
                     <input type="text" id="username" name="username" className="h-8 bg-gray-300 focus:bg-gray-400 rounded focus:outline-none" />
                  </div>

                  <div className="flex flex-col">
                     <label for="password" className="text-sm text-gray-300">Password</label>
                     <input type="text" id="password" name="password" className="h-8 bg-gray-300 focus:bg-gray-400 rounded focus:outline-none" />
                  </div>

                  <div className="pt-2 text-center">
                     <input type="submit" className="h-8 bg-gray-300 text-black text-xl px-3 focus:bg-gray-400 rounded focus:outline-none min-" value="Login" />
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export default Login;