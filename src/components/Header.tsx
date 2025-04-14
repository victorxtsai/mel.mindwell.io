import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from '@/src/assets/logo.svg?react';
import { auth } from '@/src/firebaseConfig';
import { signOut, type User } from 'firebase/auth';
import { useEffect } from 'react';

const navigation = [
  { name: 'App', href: 'https://www.mindwell.io' },
  { name: 'Features', href: '/#features' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const signInUrl = `https://auth.mindwellworld.com/signin?redirect=${encodeURIComponent(window.location.href)}`;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/checkAuth', {
          method: 'GET',
          credentials: 'include', // 👈 includes the session cookie
        });
  
        if (res.ok) {
          const userData = await res.json();
          setUser(userData); // your server should return user object
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Session fetch failed:', error);
        setUser(null);
      }
    };
  
    fetchSession();
  }, []);
  

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null); // optional since onAuthStateChanged will also do this
    window.location.reload(); // or navigate somewhere if needed
  };

  return (
    <header className="bg-transparent">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        {/* Logo on the left */}
        <a href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Mindwell</span>
          <Logo className="h-8 w-auto text-[#16F4D0]" />
        </a>

        {/* Links and buttons on the right */}
        <div className="hidden lg:flex items-center gap-x-6 ml-auto">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm/6 font-semibold text-white hover:text-gray-600"
            >
              {item.name}
            </a>
          ))}
          {user ? (
            <button
              onClick={handleSignOut}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500"
            >
              Sign Out
            </button>
          ) : (
            <a
              href={signInUrl}
              className="rounded-md bg-[#2F52E0] px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#1098F7]"
            >
              Sign In
            </a>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#16F4D0]"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gradient-to-br from-[#2F52E0] via-[#000000] to-[#000000] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Mindwell</span>
              <Logo className="h-8 w-auto text-[#16F4D0]" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href={signInUrl}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white"
                >
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
