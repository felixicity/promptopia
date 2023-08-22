'use client';

import Link from "next/link"
import Image from "next/image"
import {signIn, useSession, getProviders, signOut} from 'next-auth/react'
import {useState,useEffect} from 'react'


const Nav = () => {

    const {data:session} = useSession();
    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(()=>{
        const setUpProviders = async() => {
            const response = await getProviders();
            setProviders(response)
        }

        setUpProviders()
    },[])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image 
               src="/images/logo.svg" 
               alt="Promptopia logo"
               width={30}
               height={30}
               className="object-contain"
               />
               <p className="logo_text">Promptopia</p>
        </Link>

        <div className="sm:flex hidden">
            {
                session?.user ? (
                   <div className="flex gap-3 md:gap-5">
                        <Link href="/create_prompt"
                        className="black_btn">
                        Create Post
                        </Link>

                        <button type="button" 
                        className="outline_btn" 
                        onClick={signOut}>
                            Sign Out
                        </button>

                        <Link href="/profile">
                            <Image
                              src={session?.user.image}
                              width={37}
                              height={37}
                              className="rounded-full"
                              alt="profile image"
                            />
                        </Link>
                   </div>
                ):(
                    <>
                    {providers && 
                      Object.values(providers).map(provider => (
                        <button
                            type="button"
                            key={provider.name}
                            className="black_btn"
                            onClick={()=> signIn(provider.id)}>
                           Sign In
                        </button>
                      ))}
                    </>
                )
            }
        </div>
        <div className="sm:hidden flex relative">
            {
                session?.user ? (
                    <div className="flex">
                         <Image
                              src={session?.user.image}
                              width={37}
                              height={37}
                              className="rounded-full hover:cursor-pointer"
                              alt="profile image"
                              onClick={()=>{
                                setToggleDropdown(prev => !prev)
                              }}
                            />

                            {toggleDropdown && (
                                <div className="dropdown">
                                    <Link 
                                        href="/profile" 
                                        className="dropdown_link"
                                        onClick={() => SetToggleDropdown(false)}>
                                       My Profile
                                    </Link>
                                    <Link 
                                        href="/create_prompt" 
                                        className="dropdown_link"
                                        onClick={() => SetToggleDropdown(false)}>
                                       Create Prompt
                                    </Link>
                                    <button 
                                    type="button"
                                    className="mt-5 w-full black_btn"
                                    onClick={()=>{
                                        setToggleDropdown(false);
                                        signOut()
                                    }}>
                                      Sign Out
                                    </button>
                                </div>
                            )}
                    </div>
                ):(
                    <>
                    {providers && 
                      Object.values(providers).map(provider => (
                        <button
                            type="button"
                            key={provider.name}
                            className="black_btn"
                            onClick={()=> signIn(provider.id)}>
                           Sign In
                        </button>
                      ))}
                    </>
                )
            }
        </div>
    </nav>
  )
}

export default Nav