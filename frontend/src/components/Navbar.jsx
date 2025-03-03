import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();

  const navigation = user
    ? [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Create Capsule', href: '/create' },
        // { name: 'Notifications', href: '/notifications' },
      ]
    : [];

  return (
    <Disclosure as="nav" className="navbar">
      {({ open }) => (
        <>
          <div className="navbar-container">
            <div className="navbar-content">
              {/* Logo Section */}
              <div className="navbar-logo">
                <Link to="/" className="navbar-title">
                  MemoryMail
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="navbar-links">
                {navigation.map((item) => (
                  <Link key={item.name} to={item.href} className="navbar-link">
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* User Menu */}
              <div className="navbar-user">
                {user ? (
                  <>
                    <Link to="/about-us" className="navbar-link">About Us</Link>
                    <Link to="/notifications" className="navbar-notifications">
                      <BellIcon className="navbar-icon" />
                    </Link>
                    <Menu as="div" className="navbar-menu">
                      <Menu.Button className="navbar-menu-button">
                        <span className="navbar-avatar">
                          <svg className="navbar-avatar-icon" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="navbar-transition-enter"
                        enterFrom="navbar-transition-enterFrom"
                        enterTo="navbar-transition-enterTo"
                        leave="navbar-transition-leave"
                        leaveFrom="navbar-transition-leaveFrom"
                        leaveTo="navbar-transition-leaveTo"
                      >
                        <Menu.Items className="navbar-menu-items">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/settings"
                                className={`navbar-menu-item ${active ? 'active' : ''}`}
                              >
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={logout}
                                className={`navbar-menu-item ${active ? 'active' : ''}`}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                ) : (
                  <div className="navbar-auth">
                    <Link to="/about-us" className="navbar-link">About Us</Link>
                    <Link to="/login" className="navbar-auth-link">
                      Login
                    </Link>
                    <Link to="/register" className="navbar-auth-link">
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
