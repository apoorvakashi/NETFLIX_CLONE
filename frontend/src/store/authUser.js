import {create} from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    user : null,
    isSigningUp : false,
    isCheckingAuth : true,
    isLoggingOut : false,
    isLoggingIn : false,
    signup : async (credentials) => {
        set({isSigningUp : true});
        try {
            const response = await axios.post('/api/v1/auth/signup', credentials);
            set({user : response.data.user, isSigningUp : false});
            toast.success("Account created successfully");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message  || "Signup Failed");
            set({user: null, isSigningUp : false});
        }
    },
    login : async (credentials) => {
        set({isLoggingIn : true});
        try{
            const response  = await axios.post('/api/v1/auth/login', credentials);
            set({user : response.data.user, isLoggingIn : false});
            toast.success("Logged In successfully");
        }
        catch(error){
            toast.error(error.response.data.message || "Login Failed");
            set({user: null, isLoggingIn : false});
        }

    },
    logout : async () => {
        set({isLoggingOut : true});
        try {
            await axios.post('/api/v1/auth/logout');
            set({user : null, isLoggingOut : false});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message || "An error occurred");
            set({user: null, isLoggingOut : false});
        }
    },
    authCheck : async () => {
        set({isCheckingAuth : true});
        try {
            const response = await axios.get('/api/v1/auth/authCheck');
            set({user : response.data.user, isCheckingAuth : false});
        } catch (error) {
            console.log(error);
            set({user : null, isCheckingAuth : false});
        }
    },
}))