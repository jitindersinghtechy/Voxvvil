import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signupRequest } from '../../redux/modules/auth/authSlice';
import { toast } from 'react-toastify';


const schema = yup.object().shape({
    name: yup.string().required('Business Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
});

const Signup = () => {
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
        dispatch(signupRequest(data));
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Name</label>
                <input type='text' placeholder='Name' {...register('name')} />
                {errors?.name?.message && <p>{errors?.name?.message}</p>}
            </div>
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
                <label>Confirm Password</label>
                <input type='password' {...register('confirmPassword')} />
                {errors?.confirmPassword?.message && <p>{errors?.confirmPassword?.message}</p>}
            </div>
            {loading ?
                <button type='button'>Loading</button>
                :
                <button>Sumbit</button>
            }
            <Link to="login">Login</Link>
        </form>

    )
}

export default Signup