import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import iconUser from "../images/user_icon.png";
import logo from "../images/logo.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LanguageSwitcher from "../translations/LanguageSwitcher";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ComplexNavbar() {
  const { t, i18n } = useTranslation();
  const userInfo = JSON.parse(localStorage.getItem("user-info"));

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user-info");
    window.location.reload(false);
  };

  const navigation = [
    { name: t("Home"), href: "/", current: false },
    { name: t("About"), href: "/#about", current: false },
    { name: t("Contact"), href: "#", current: false },
    {
      name: <b>{t("QuickAppointment")}</b>,
      href: "/quickappointment",
      current: true,
    },
  ];

  const userMenu = [
    { name: t("MyAppointments"), href: "/myappointments" },
    { name: t("MyShoppingCart"), href: "/myshoppingcart" },
    { name: t("MyBusiness"), href: "/mybusiness" },
    { name: t("OpenNewBussiness"), href: "/newbusiness" },
  ];

  return (
    <>
      <Disclosure
        as="nav"
        className="fixed top-0 z-50 w-full bg-gray-800 shadow"
      >
        {({ open }) => (
          <>
            <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                  {/* Logo button */}
                  <Disclosure.Button as={Link} to={"/"}>
                    <div className="flex items-center flex-shrink-0 cursor-pointer">
                      <img
                        className="w-auto h-8"
                        src={logo}
                        alt="Your Company"
                      />
                    </div>
                  </Disclosure.Button>
                      
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as={Link}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white no-underline"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium no-underline"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* <button
                  type="button"
                  className="relative p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="w-6 h-6" aria-hidden="true" />
                </button> */}

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex text-sm bg-gray-800 rounded-full hover:ring-2 hover:ring-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="w-8 h-8 rounded-full"
                          src={iconUser}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 py-1 mt-2 no-underline origin-top-right bg-white rounded-md shadow-lg w-52 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className={`px-4 pt-2`}>
                          {userInfo ? (
                            <div
                              className={`${
                                i18n.language === "he" && "text-right"
                              }`}
                            >
                              <span className="block text-sm text-gray-900 dark:text-white">
                                <b>
                                  {t("Hello")} {userInfo.firstname}
                                </b>
                              </span>
                              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                                {userInfo.email}
                              </span>
                            </div>
                          ) : (
                            <>
                              <span className="block text-sm text-gray-900 dark:text-white">
                                <b>{t("HelloGuest")}</b>
                              </span>
                            </>
                          )}
                        </div>
                        <div className="mt-2 border-t border-gray-300"></div>
                        {!userInfo ? (
                          <Menu.Item>
                            <Disclosure.Button
                              className={`no-underline ${
                                i18n.language === "he" && "text-right"
                              }`}
                              as={Link}
                              to="/login"
                            >
                              {({ active }) => (
                                <div
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "hover:bg-gray-500 hover:text-white no-underline block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Login / Register
                                </div>
                              )}
                            </Disclosure.Button>
                          </Menu.Item>
                        ) : (
                          <>
                            {userMenu.map((item, index) => (
                              <Menu.Item key={index}>
                                <Disclosure.Button
                                  className={`no-underline ${
                                    i18n.language === "he" && "text-right"
                                  }`}
                                  as={Link}
                                  to={item.href}
                                >
                                  {({ active }) => (
                                    <div
                                      className={classNames(
                                        active ? "bg-gray-100 " : "",
                                        "hover:bg-gray-500 hover:text-white no-underline block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </div>
                                  )}
                                </Disclosure.Button>
                              </Menu.Item>
                            ))}

                            <Menu.Item
                              className={`${
                                i18n.language === "he" && "text-right"
                              }`}
                            >
                              <Disclosure.Button
                                className={`${
                                  i18n.language === "he" && "text-right"
                                }`}
                                onClick={handleShow}
                              >
                                {({ active }) => (
                                  <div
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "no-underline block px-4 py-2 text-sm text-red-500"
                                    )}
                                  >
                                    <b>{t("Logout")}</b>
                                  </div>
                                )}
                              </Disclosure.Button>
                            </Menu.Item>
                          </>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <Disclosure.Button
                    className={classNames(
                      "text-white block rounded-md px-3 py-2 text-base font-medium no-underline"
                    )}
                    aria-current={"page"}
                  >
                    <b>
                      <LanguageSwitcher />
                    </b>
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel
              className={`${
                i18n.language === "he" && "text-right"
              } sm:hidden animate-slidedown`}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium no-underline"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h5>{t("AreUSure")}</h5>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("No")}
          </Button>
          <Button variant="btn btn-success" onClick={logOut}>
            {t("Yes")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
