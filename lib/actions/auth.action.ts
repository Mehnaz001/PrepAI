'use server';

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

export async function signUp (params: SignUpParams) {
   const {uid, name, email} = params; 

   try{
    const userRecord = await db.collection('users').doc(uid).get();
    if(userRecord.exists) {
        return {
            success: false,
            message: "User already exist.Try sign in instead"
        }
    }

    await db.collection('Users').doc(uid).set({
        name,email
    })

    return {
        success: true,
        message: "Account created succesfully"
    }

   }catch(e: any) {
    console.log('Error in creating a user', e);

    if(e.code === 'auth/already-exist') {
        return {
            success: false,
            message : "The email is already in use"
        }
    }

    return {
        success: false,
        message : "Failed to create an account"
    }
   }
}
export async function signIn(params: SignInParams) {
    const {email, idToken} = params;

    try{
        const userRecord = await auth.getUserByEmail(email)

        if(!userRecord) {
           
            return {
                success: false,
                message: "User doesn't exist. Create a new account instead"
            }
        }

        await setSessionCookie(idToken);
    }catch(e) {
        console.log(e);

        return {
            success: false,
            message: "Failed to log in an account"
        }
    }
}
const ONE_WEEK = 7 * 24 * 60 * 60;

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();
    
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: ONE_WEEK * 1000,
    });

    cookieStore.set('session', sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        path:'/',
        sameSite: 'lax'
    })
}

export async function getCurrentUser():Promise<User | null> {
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get('session')?.value;

    if(!sessionCookie) {
        return null;
    }

    try{
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

        if(!userRecord) return null;

        return {
            ...userRecord.data(),
            id: userRecord.id,

        } as User
    }catch(e) {
        console.log(e);
        return null;
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();

    return !!user; // passing value in boolean
}