import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest } from '../../redux/modules/auth/authSlice';
import { toast } from 'react-toastify';


const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    role: yup.string().required('Role is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { loading, isLoggedIn, res, userData } = useSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (isLoggedIn) {
            navigate(`/${userData.role}`)
        }
        toast(res?.message)
    }, [res, userData, isLoggedIn, navigate])

    const onSubmit = (data) => {
        dispatch(loginRequest(data));
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email</label>
                <input type='text' placeholder='Email' {...register('email')} />
                {errors?.email?.message && <p>{errors?.email?.message}</p>}
            </div>
            <div>
                <label>Password</label>
                <input type='password' {...register('password')} />
                {errors?.password?.message && <p>{errors?.password?.message}</p>}
            </div>
            <div>
                <select defaultValue={"user"} {...register('role')}>
                    <option value={"user"}>user</option>
                    <option value={"admin"}>Admin</option>
                </select>
                {errors?.role?.message && <p>{errors?.role?.message}</p>}
            </div>
            {loading ? <button type='button'>Loading</button> : <button>Sumbit</button>}
            <Link to="signup">Signup</Link>
        </form>

    )
}

export default Login;