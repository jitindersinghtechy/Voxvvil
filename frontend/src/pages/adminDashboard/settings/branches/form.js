import React, { useEffect } from 'react';
import { FormControl, TextField, Button, Grid, FormHelperText } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { postRequest, putRequest, resetPost, resetPut } from '../../../../redux/modules/branch/slice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.number().typeError('Invalid phone number').required('Phone number is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    country: yup.string().required('Country is required'),
    address: yup.string().required('Address is required'),
});

const BranchForm = ({ itemData, toggleList }) => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let { loading, postRes, putRes } = useSelector(state => state.branch);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: itemData
    });

    useEffect(() => {
        if (postRes) {
            if (postRes?.success) {
                toggleList();
            }
            toast(postRes?.message)
            dispatch(resetPost());
        }
        if (putRes) {
            if (putRes?.success) {
                toggleList();
            }
            toast(putRes?.message);
            dispatch(resetPut());
        }
    }, [postRes, putRes, toggleList, navigate, dispatch]);

    const onSubmit = (data) => {
        if (itemData?._id) {
            dispatch(putRequest(data));
        } else {
            dispatch(postRequest(data));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <FormControl fullWidth error={Boolean(errors.name)}>
                        <TextField label="Branch Name" fullWidth {...register('name')} />
                        {errors?.name?.message && <FormHelperText>{errors?.name?.message}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth error={Boolean(errors.email)}>
                        <TextField label="Branch Email" fullWidth {...register('email')} />
                        {errors?.email?.message && <FormHelperText>{errors?.email?.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth error={Boolean(errors.phone)}>
                        <TextField label="Phone Number" type='number' fullWidth {...register('phone')} />
                        {errors?.phone?.message && <FormHelperText>{errors?.phone?.message}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth error={Boolean(errors.city)}>
                        <TextField label="City" fullWidth {...register('city')} />
                        {errors?.city?.message && <FormHelperText>{errors?.city?.message}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth error={Boolean(errors.state)}>
                        <TextField label="State" fullWidth {...register('state')} />
                        {errors?.state?.message && <FormHelperText>{errors?.state?.message}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth error={Boolean(errors.country)}>
                        <TextField label="Country" fullWidth {...register('country')} />
                        {errors?.country?.message && <FormHelperText>{errors?.country?.message}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth error={Boolean(errors.address)}>
                        <TextField label="Address" fullWidth {...register('address')} />
                        {errors?.address?.message && <FormHelperText>{errors?.address?.message}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid item xs={12} textAlign={"right"}>
                    <Button type="submit" variant='contained' size="large" disabled={loading}>
                        {itemData?._id ? "Update" : "Submit"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default BranchForm;
