import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const {loginUser,loginWithGoogle } = useContext(AuthContext)
    const handleGoogle = ()=>{
        loginWithGoogle()
        .then(result=>{
            console.log(result.user)
            navigate(location?.state ? location.state : '/')
        })
        .catch(er=>{
            console.log(er)
        })
    }
        const handleLogin =e=>{
            e.preventDefault();
            const form = e.target;
            const email = form.email.value;
            const password = form.password.value;
            // console.log(email,password)
            loginUser(email,password)
            .then(result=>{
                console.log(result.user)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate(location?.state ? location.state : '/')
            })
            .catch(er=>{
                console.log(er)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: er.code,
                  });
            })
        }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleLogin}>
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input name='email' type="email" className="input" placeholder="Email" />
                            <label className="label">Password</label>
                            <input name='password' type="password" className="input" placeholder="Password" />
                            
                           <button className="btn btn-neutral mt-4">Login</button>
                            
                            <p>Don't have an Account? Please <Link to='/register'><span className='text-red-600 font-bold'>Register</span></Link></p>
                        </fieldset>
                        
                    </form>
                    <button className='btn btn-primary m-6' onClick={handleGoogle}>login With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;