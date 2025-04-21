import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import auth from '../../Firebase/Firebase.config'
const Register = () => {
    const [error, setError] = useState({})
    const navigate = useNavigate();
    const { createUser, updateUserProfile, setUser } = useContext(AuthContext)
    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;
        const profileImage = form.profileImage.value
        // console.log(email,password)
        createUser(email, password)
            .then(result => {
                console.log(result.user)
                updateUserProfile({
                    displayName: name,
                    photoURL: profileImage
                })
                .then(()=>{
                    result.user.reload()
                    .then(() => {
                        console.log("After reload:", auth.currentUser);
                        setUser({ ...result.user, displayName: name, photoURL: profileImage })
                        
                    });
                   
                })


                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Register Success",
                    showConfirmButton: false,
                    timer: 1500
                });
                
                navigate('/')
            })
            .catch(er => {
                console.log(er)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: er.code,
                });
            })
    }
    const checkingError = (password) => {
        if (password.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter.";
        }
        return "";
    };
    const handlePassword = (e) => {
        e.preventDefault();
        const newPassword = e.target.value;

        const er = checkingError(newPassword)
        setError({ ...error, password: er })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleRegister}>
                        <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input name='name' type="text" className="input" placeholder="name" />
                            <label className="label">Profile Picture URL</label>
                            <input name='profileImage' type="URL" className="input" placeholder="Profile Picture URL" />
                            <label className="label">Email</label>
                            <input name='email' type="email" className="input" placeholder="Email" />
                            <label className="label">Password</label>
                            {/* <input name='password' type="password" className="input" placeholder="Password" /> */}

                            <input onChange={handlePassword} name='password' type="password" className="input" placeholder="Password" />
                            {
                                error.password && <label className="label text-xs text-red-700">
                                    {error.password}
                                </label>

                            }
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4">Register</button>
                            <p>Already have an Account? Please <Link to='/login'>Login</Link></p>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;

