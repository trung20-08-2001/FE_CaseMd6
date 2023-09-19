import React from 'react'
// import "./bootstrap-icons.css"
import "./materialdesignicons.min.css"
import "./simplebar.min.css"
import "./theme.min.css"

function Chat() {
    return (
        <>
            <div id="app-content">
                <div className="app-content-area">
                    <div className="container-fluid">
                        {/* row */}
                        <div className="card chat-layout">
                            <div className="row g-0">
                                <div className="col-xxl-3 col-xl-4 col-md-12 col-12 border-end">
                                    <div className="h-100">
                                        {/* chat list */}
                                        <div className="chat-window">
                                            <div className="chat-sticky-header sticky-top">
                                                <div className="px-4 pt-3 pb-4">
                                                    {/* heading */}
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h1 className="mb-0  h3">Chat</h1>
                                                        </div>
                                                        {/* new chat dropdown */}
                                                        <div>
                                                            <a
                                                                href="#!"
                                                                className="btn btn-primary rounded-circle btn-icon texttooltip"
                                                                data-template="newchat"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#newchatModal"
                                                            >
                                                                <i data-feather="edit" className="icon-xs" />
                                                                <div id="newchat" className="d-none">
                                                                    <span>New Chat</span>
                                                                </div>
                                                            </a>
                                                            <span className="dropdown dropstart">
                                                                <a
                                                                    href="#!"
                                                                    className="btn btn-light btn-icon rounded-circle "
                                                                    id="settingLink"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-haspopup="true"
                                                                    aria-expanded="false"
                                                                >
                                                                    <i data-feather="settings" className="icon-xxs" />
                                                                </a>
                                                                <span
                                                                    className="dropdown-menu"
                                                                    aria-labelledby="settingLink"
                                                                >
                                                                    <a className="dropdown-item" href="#!">
                                                                        Setting
                                                                    </a>
                                                                    <a className="dropdown-item" href="#!">
                                                                        Help and Feedback
                                                                    </a>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {/* search */}
                                                    <div className="mt-4 mb-4">
                                                        <input
                                                            type="search"
                                                            className="form-control"
                                                            placeholder="Search people, group and messages"
                                                        />
                                                    </div>
                                                    {/* User chat */}
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        {/* media */}
                                                        <a href="#!" className="text-inherit">
                                                            <div className="d-flex">
                                                                <div className="avatar avatar-md avatar-indicators avatar-online">
                                                                    <img
                                                                        src="../assets/images/avatar/avatar-11.jpg"
                                                                        alt="Image"
                                                                        className="rounded-circle"
                                                                    />
                                                                </div>
                                                                {/* media body */}
                                                                <div className=" ms-2">
                                                                    <h5 className="mb-0">Jitu Chauhan</h5>
                                                                    <p className="mb-0 text-muted">Online</p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        {/* dropdown */}
                                                        <div className="dropdown dropstart">
                                                            <a
                                                                href="#!"
                                                                className="btn btn-ghost btn-icon btn-sm rounded-circle"
                                                                id="userSetting"
                                                                data-bs-toggle="dropdown"
                                                                aria-haspopup="true"
                                                                aria-expanded="false"
                                                            >
                                                                <i
                                                                    data-feather="more-horizontal"
                                                                    className="icon-xs"
                                                                />
                                                            </a>
                                                            <ul
                                                                className="dropdown-menu"
                                                                aria-labelledby="userSetting"
                                                            >
                                                                <li className="dropdown-animation dropdown-submenu dropdown-toggle-none">
                                                                    <a
                                                                        className="dropdown-item dropdown-toggle"
                                                                        href="#!"
                                                                        aria-haspopup="true"
                                                                        aria-expanded="false"
                                                                        data-bs-toggle="dropdown"
                                                                    >
                                                                        <i
                                                                            className=" dropdown-item-icon"
                                                                            data-feather="circle"
                                                                        />
                                                                        Status
                                                                    </a>
                                                                    <ul className="dropdown-menu dropdown-menu-xs">
                                                                        <li>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <span className="badge-dot bg-success me-2" />
                                                                                Online
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <span className="badge-dot bg-secondary me-2" />
                                                                                Offline
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <span className="badge-dot bg-warning me-2" />
                                                                                Away
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <span className="badge-dot bg-danger me-2" />
                                                                                Busy
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                                <li>
                                                                    <a className="dropdown-item" href="#!">
                                                                        <i
                                                                            className=" dropdown-item-icon"
                                                                            data-feather="settings"
                                                                        />
                                                                        Setting
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className="dropdown-item" href="#!">
                                                                        <i
                                                                            className=" dropdown-item-icon"
                                                                            data-feather="user"
                                                                        />
                                                                        Profile
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className="dropdown-item" href="#!">
                                                                        <i
                                                                            className=" dropdown-item-icon"
                                                                            data-feather="power"
                                                                        />
                                                                        Sign Out
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* nav tabs*/}
                                                <ul className="nav nav-line-bottom" id="tab" role="tablist">
                                                    {/* nav item */}
                                                    <li className="nav-item">
                                                        <a
                                                            className="nav-link active py-2"
                                                            id="recent-tab"
                                                            data-bs-toggle="pill"
                                                            href="#recent"
                                                            role="tab"
                                                            aria-controls="recent"
                                                            aria-selected="true"
                                                        >
                                                            Recent
                                                        </a>
                                                    </li>
                                                    {/* nav item */}
                                                    <li className="nav-item">
                                                        <a
                                                            className="nav-link py-2"
                                                            id="contact-tab"
                                                            data-bs-toggle="pill"
                                                            href="#contact"
                                                            role="tab"
                                                            aria-controls="contact"
                                                            aria-selected="true"
                                                        >
                                                            Contact
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div
                                                data-simplebar=""
                                                style={{ height: 600, overflow: "auto" }}
                                            >
                                                {/* tab content */}
                                                <div className="tab-content" id="tabContent">
                                                    {/* tab pane */}
                                                    <div
                                                        className="tab-pane fade show active"
                                                        id="recent"
                                                        role="tabpanel"
                                                        aria-labelledby="recent-tab"
                                                    >
                                                        {/* contact list */}
                                                        <ul className="list-unstyled contacts-list">
                                                            {/* contact item */}
                                                            <li className="py-3 px-4 chat-item contacts-link">
                                                                {/* contact link */}
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    {/* media */}
                                                                    <a href="#!" className="text-inherit ">
                                                                        <div className="d-flex">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-online">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-2.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0 ">Denise Reece</h5>
                                                                                <p className="mb-0 text-muted text-truncate">
                                                                                    I m for unread message components...
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                    <div>
                                                                        {/* icon */}
                                                                        <small className="text-muted">8:48AM</small>
                                                                        <div className="text-end">
                                                                            <span className="icon-shape icon-xs text-white bg-danger rounded-circle  fs-6">
                                                                                1
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* chat action */}
                                                                <div className="chat-actions">
                                                                    {/* dropdown */}
                                                                    <div className="dropdown dropstart">
                                                                        <a
                                                                            href="#!"
                                                                            className="btn btn-white btn-icon btn-sm rounded-circle primary-hover"
                                                                            id="dropdownMenuButton2"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-haspopup="true"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <i
                                                                                data-feather="more-horizontal"
                                                                                className="icon-xs"
                                                                            />
                                                                        </a>
                                                                        <div
                                                                            className="dropdown-menu"
                                                                            aria-labelledby="dropdownMenuButton2"
                                                                        >
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-pin-angle dropdown-item-icon" />
                                                                                Pin
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-person-x dropdown-item-icon" />
                                                                                Mute
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-eye-slash dropdown-item-icon" />
                                                                                Hide
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-person-plus dropdown-item-icon" />
                                                                                Add to Favorite
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {/* chat item */}
                                                            <li className="bg-light py-3 px-4 chat-item contacts-link">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <a href="#!" className="text-inherit ">
                                                                        {/* media */}
                                                                        <div className="d-flex">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-online">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-4.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0">Kevin White</h5>
                                                                                <p className="mb-0 text-muted">
                                                                                    Currently chat with user components...
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                    <div>
                                                                        <small className="text-muted">8:48AM</small>
                                                                    </div>
                                                                </div>
                                                                {/* chat actions */}
                                                                <div className="chat-actions">
                                                                    {/* dropdown */}
                                                                    <div className="dropdown dropstart">
                                                                        <a
                                                                            href="#!"
                                                                            className="btn btn-white btn-icon btn-sm rounded-circle primary-hover"
                                                                            id="dropdownMenuButton3"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-haspopup="true"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width={24}
                                                                                height={24}
                                                                                viewBox="0 0 24 24"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                strokeWidth={2}
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                className="feather feather-more-horizontal icon-xs"
                                                                            >
                                                                                <circle cx={12} cy={12} r={1} />
                                                                                <circle cx={19} cy={12} r={1} />
                                                                                <circle cx={5} cy={12} r={1} />
                                                                            </svg>
                                                                        </a>
                                                                        {/* dropdown menu */}
                                                                        <div
                                                                            className="dropdown-menu"
                                                                            aria-labelledby="dropdownMenuButton3"
                                                                        >
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-pin-angle dropdown-item-icon" />
                                                                                Pin
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-person-x dropdown-item-icon" />
                                                                                Mute
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-eye-slash dropdown-item-icon" />
                                                                                Hide
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-person-plus dropdown-item-icon" />
                                                                                Add to Favorite
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {/* chat item */}
                                                            <li className="py-3 px-4 chat-item contacts-link">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <a href="#!" className="text-inherit ">
                                                                        {/* media */}
                                                                        <div className="d-flex">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-online">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-3.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0">Mary Newton</h5>
                                                                                <img
                                                                                    src="../assets/images/png/dot-move.png"
                                                                                    alt="Image"
                                                                                    className="ms-1"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                    <div>
                                                                        <small className="text-muted">8:48AM</small>
                                                                    </div>
                                                                </div>
                                                                {/* chat actions */}
                                                                <div className="chat-actions">
                                                                    {/* dropdown  */}
                                                                    <div className="dropdown dropstart">
                                                                        <a
                                                                            href="#!"
                                                                            className="btn btn-white btn-icon btn-sm rounded-circle primary-hover"
                                                                            id="dropdownMenuButton4"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-haspopup="true"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <i
                                                                                data-feather="more-horizontal"
                                                                                className="icon-xs"
                                                                            />
                                                                        </a>
                                                                        <div
                                                                            className="dropdown-menu"
                                                                            aria-labelledby="dropdownMenuButton4"
                                                                        >
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-pin-angle dropdown-item-icon" />
                                                                                Pin
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-person-x dropdown-item-icon" />
                                                                                Mute
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-eye-slash dropdown-item-icon" />
                                                                                Hide
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-person-plus dropdown-item-icon" />
                                                                                Add to Favorite
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {/* chat item */}
                                                            <li className="py-3 px-4 chat-item contacts-link">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <a href="#!" className="text-inherit ">
                                                                        {/* media */}
                                                                        <div className="d-flex">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-online">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-6.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            <div className="avatar avatar-sm avatar-primary position-absolute mt-3 ms-n2">
                                                                                <span className="avatar-initials rounded-circle fs-6">
                                                                                    DU
                                                                                </span>
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0">Figma to HTML5</h5>
                                                                                <p className="mb-0 text-muted">
                                                                                    Convert Figma to HTML5 template...
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                    <div>
                                                                        <small className="text-muted">3/11/2023</small>
                                                                    </div>
                                                                </div>
                                                                {/* chat actions */}
                                                                <div className="chat-actions">
                                                                    <div className="dropdown dropstart">
                                                                        <a
                                                                            href="#!"
                                                                            className="btn btn-white btn-icon btn-sm rounded-circle primary-hover"
                                                                            id="dropdownMenuButton5"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-haspopup="true"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <i
                                                                                data-feather="more-horizontal"
                                                                                className="icon-xs"
                                                                            />
                                                                        </a>
                                                                        {/* dropdown menu */}
                                                                        <div
                                                                            className="dropdown-menu"
                                                                            aria-labelledby="dropdownMenuButton5"
                                                                        >
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-pin-angle dropdown-item-icon" />
                                                                                Pin
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-person-x dropdown-item-icon" />
                                                                                Mute
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-eye-slash dropdown-item-icon" />
                                                                                Hide
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-person-plus dropdown-item-icon" />
                                                                                Add to Favorite
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {/* chat item */}
                                                            <li className="py-3 px-4 chat-item contacts-link">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <a href="#!" className="text-inherit ">
                                                                        {/* media */}
                                                                        <div className="d-flex">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-away">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-5.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0">Richard Sousa</h5>
                                                                                <p className="mb-0 text-muted">
                                                                                    On going description of group...
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                    <div>
                                                                        <small className="text-muted">2/10/2023</small>
                                                                    </div>
                                                                </div>
                                                                {/* chat actions */}
                                                                <div className="chat-actions">
                                                                    {/* dropdown */}
                                                                    <div className="dropdown dropstart">
                                                                        <a
                                                                            href="#!"
                                                                            className="btn btn-white btn-icon btn-sm rounded-circle primary-hover"
                                                                            id="dropdownMenuButton6"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-haspopup="true"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <i
                                                                                data-feather="more-horizontal"
                                                                                className="icon-xs"
                                                                            />
                                                                        </a>
                                                                        {/* dropdown menu */}
                                                                        <div
                                                                            className="dropdown-menu"
                                                                            aria-labelledby="dropdownMenuButton6"
                                                                        >
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-pin-angle dropdown-item-icon" />
                                                                                Pin
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-person-x dropdown-item-icon" />
                                                                                Mute
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-eye-slash dropdown-item-icon" />
                                                                                Hide
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-person-plus dropdown-item-icon" />
                                                                                Add to Favorite
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {/* chat item */}
                                                            <li className="py-3 px-4 chat-item contacts-link">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <a href="#!" className="text-inherit ">
                                                                        {/* media */}
                                                                        <div className="d-flex">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-offline">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-9.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0">Melissa Westbrook</h5>
                                                                                <p className="mb-0 text-muted">
                                                                                    On going description of group...
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                    <div>
                                                                        <small className="text-muted">2/3/2023</small>
                                                                    </div>
                                                                </div>
                                                                {/* chat actions */}
                                                                <div className="chat-actions">
                                                                    {/* dropdown  */}
                                                                    <div className="dropdown dropstart">
                                                                        <a
                                                                            href="#!"
                                                                            className="btn btn-white btn-icon btn-sm rounded-circle primary-hover"
                                                                            id="dropdownMenuButton7"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-haspopup="true"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <i
                                                                                data-feather="more-horizontal"
                                                                                className="icon-xs"
                                                                            />
                                                                        </a>
                                                                        <div
                                                                            className="dropdown-menu"
                                                                            aria-labelledby="dropdownMenuButton7"
                                                                        >
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-pin-angle dropdown-item-icon" />
                                                                                Pin
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-person-x dropdown-item-icon" />
                                                                                Mute
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-eye-slash dropdown-item-icon" />
                                                                                Hide
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-person-plus dropdown-item-icon" />
                                                                                Add to Favorite
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {/* chat item */}
                                                            <li className="py-3 px-4 chat-item contacts-link">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <a href="#!" className="text-inherit ">
                                                                        {/* media */}
                                                                        <div className="d-flex">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-busy">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-19.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0">Christy Obrien</h5>
                                                                                <p className="mb-0 text-muted">
                                                                                    Start design system for UI.
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                    <div>
                                                                        <small className="text-muted">1/24/2023</small>
                                                                    </div>
                                                                </div>
                                                                {/* chat actions */}
                                                                <div className="chat-actions">
                                                                    {/* dropdown */}
                                                                    <div className="dropdown dropstart">
                                                                        <a
                                                                            href="#!"
                                                                            className="btn btn-white btn-icon btn-sm rounded-circle primary-hover"
                                                                            id="dropdownMenuButton8"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-haspopup="true"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <i
                                                                                data-feather="more-horizontal"
                                                                                className="icon-xs"
                                                                            />
                                                                        </a>
                                                                        <div
                                                                            className="dropdown-menu"
                                                                            aria-labelledby="dropdownMenuButton8"
                                                                        >
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-pin-angle dropdown-item-icon" />
                                                                                Pin
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-person-x dropdown-item-icon" />
                                                                                Mute
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-eye-slash dropdown-item-icon" />
                                                                                Hide
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-person-plus dropdown-item-icon" />
                                                                                Add to Favorite
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {/* chat item */}
                                                            <li className="py-3 px-4 chat-item contacts-link">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <a href="#!" className="text-inherit ">
                                                                        {/* media */}
                                                                        <div className="d-flex">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-busy">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-12.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0">Herbert Strayhorn</h5>
                                                                                <p className="mb-0 text-muted">
                                                                                    Start design system for UI...
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                    <div>
                                                                        <small className="text-muted">3/3/2023</small>
                                                                    </div>
                                                                </div>
                                                                {/* chat actions */}
                                                                <div className="chat-actions">
                                                                    {/* dropdown */}
                                                                    <div className="dropdown dropstart">
                                                                        <a
                                                                            href="#!"
                                                                            className="btn btn-white btn-icon btn-sm rounded-circle primary-hover"
                                                                            id="dropdownMenuButton9"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-haspopup="true"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <i
                                                                                data-feather="more-horizontal"
                                                                                className="icon-xs"
                                                                            />
                                                                        </a>
                                                                        <div
                                                                            className="dropdown-menu"
                                                                            aria-labelledby="dropdownMenuButton9"
                                                                        >
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-pin-angle dropdown-item-icon" />
                                                                                Pin
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-person-x dropdown-item-icon" />
                                                                                Mute
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-eye-slash dropdown-item-icon" />
                                                                                Hide
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-person-plus dropdown-item-icon" />
                                                                                Add to Favorite
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            {/* chat item */}
                                                            <li className="py-3 px-4 chat-item contacts-link">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <a href="#!" className="text-inherit ">
                                                                        {/* media */}
                                                                        <div className="d-flex">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-online">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-14.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0">Joe Lindahl</h5>
                                                                                <p className="mb-0 text-muted">
                                                                                    On going description of group..
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                    <div>
                                                                        <small className="text-muted">1/5/2023</small>
                                                                    </div>
                                                                </div>
                                                                {/* chat actions */}
                                                                <div className="chat-actions">
                                                                    {/* dropdown */}
                                                                    <div className="dropdown dropstart">
                                                                        <a
                                                                            href="#!"
                                                                            className="btn btn-white btn-icon btn-sm rounded-circle primary-hover"
                                                                            id="dropdownMenuButton10"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-haspopup="true"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <i
                                                                                data-feather="more-horizontal"
                                                                                className="icon-xs"
                                                                            />
                                                                        </a>
                                                                        <div
                                                                            className="dropdown-menu"
                                                                            aria-labelledby="dropdownMenuButton10"
                                                                        >
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-pin-angle dropdown-item-icon" />
                                                                                Pin
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-person-x dropdown-item-icon" />
                                                                                Mute
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-eye-slash dropdown-item-icon" />
                                                                                Hide
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i className="bi-person-plus dropdown-item-icon" />
                                                                                Add to Favorite
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    {/* tab pane */}
                                                    <div
                                                        className="tab-pane"
                                                        id="contact"
                                                        role="tabpanel"
                                                        aria-labelledby="contact-tab"
                                                    >
                                                        <ul className="list-unstyled">
                                                            {/* list */}
                                                            <li>
                                                                <div className="bg-light py-1 px-4 border-bottom ">
                                                                    F
                                                                </div>
                                                                <a href="#!" className="text-inherit ">
                                                                    <div className="d-flex justify-content-between align-items-center py-3 px-4 border-bottom chat-item">
                                                                        {/* media */}
                                                                        <div className="d-flex position-relative">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-online">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-2.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0">Fatima Darbar</h5>
                                                                                <p className="mb-0 text-muted text-truncate">
                                                                                    Online
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex justify-content-between align-items-center py-3 px-4 chat-item">
                                                                        {/* media */}
                                                                        <div className="d-flex position-relative">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-offline">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-6.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            <div className="avatar avatar-sm avatar-primary position-absolute mt-3 ms-n2">
                                                                                <span className="avatar-initials rounded-circle fs-6">
                                                                                    DU
                                                                                </span>
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0">Figma Design Group</h5>
                                                                                <p className="mb-0 text-muted text-truncate">
                                                                                    Offline
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            {/* list */}
                                                            <li>
                                                                <div className="bg-light py-1 px-4 border-bottom border-top  text-dark">
                                                                    J
                                                                </div>
                                                                <a href="#!" className="text-inherit">
                                                                    <div className="d-flex justify-content-between align-items-center py-3 px-4 border-bottom chat-item">
                                                                        {/* media */}
                                                                        <div className="d-flex">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-away">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-19.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0">Jamarcus Streich</h5>
                                                                                <p className="mb-0 text-muted text-truncate">
                                                                                    Away
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex justify-content-between align-items-center py-3 px-4 chat-item">
                                                                        {/* media */}
                                                                        <div className="d-flex">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-away">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-21.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0">Jasmin Poicha</h5>
                                                                                <p className="mb-0 text-muted text-truncate">
                                                                                    Away
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            {/* list */}
                                                            <li>
                                                                <div className="bg-light py-1 px-4 border-bottom border-top  text-dark">
                                                                    O
                                                                </div>
                                                                <a href="#!" className="text-inherit">
                                                                    <div className="d-flex justify-content-between align-items-center py-3 px-4 border-bottom chat-item">
                                                                        {/* media */}
                                                                        <div className="d-flex">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-online">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-2.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0">Olivia Cooper</h5>
                                                                                <p className="mb-0 text-muted text-truncate">
                                                                                    Feeling Happy
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex justify-content-between align-items-center py-3 px-4 chat-item">
                                                                        {/* media */}
                                                                        <div className="d-flex">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-busy">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-12.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0">Oswal Baug</h5>
                                                                                <p className="mb-0 text-muted text-truncate">
                                                                                    Busy
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            {/* list */}
                                                            <li>
                                                                <div className="bg-light py-1 px-4 border-bottom border-top  text-dark">
                                                                    P
                                                                </div>
                                                                <a href="#!" className="text-inherit">
                                                                    <div className="d-flex justify-content-between align-items-center py-3 px-4 chat-item">
                                                                        {/* media */}
                                                                        <div className="d-flex">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-online">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-5.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0">Pete Martin</h5>
                                                                                <p className="mb-0 text-muted text-truncate">
                                                                                    Online
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                                <a href="#!" className="text-inherit">
                                                                    <div className="d-flex justify-content-between align-items-center py-3 px-4 chat-item">
                                                                        {/* media */}
                                                                        <div className="d-flex">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-online">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-11.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0">Kancha China</h5>
                                                                                <p className="mb-0 text-muted text-truncate">
                                                                                    Offline
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            {/* list */}
                                                            <li>
                                                                <div className="bg-light py-1 px-4 border-bottom border-top  text-dark">
                                                                    S
                                                                </div>
                                                                <a href="#!" className="text-inherit">
                                                                    <div className="d-flex justify-content-between align-items-center py-3 px-4 chat-item">
                                                                        {/* media */}
                                                                        <div className="d-flex">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-online">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-4.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0">Kevin White</h5>
                                                                                <p className="mb-0 text-muted text-truncate">
                                                                                    Busy
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                                <a href="#!" className="text-inherit">
                                                                    <div className="d-flex justify-content-between align-items-center py-3 px-4 chat-item">
                                                                        {/* media */}
                                                                        <div className="d-flex">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-online">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-8.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0">Sarita Nigam</h5>
                                                                                <p className="mb-0 text-muted text-truncate">
                                                                                    Busy
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            {/* list */}
                                                            <li>
                                                                <div className="bg-light py-1 px-4 border-bottom border-top  text-dark">
                                                                    T
                                                                </div>
                                                                <a href="#!" className="text-inherit">
                                                                    <div className="d-flex justify-content-between align-items-center py-3 px-4 chat-item">
                                                                        {/* media */}
                                                                        <div className="d-flex">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-online">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-3.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0">Tanya Davias</h5>
                                                                                <p className="mb-0 text-muted text-truncate">
                                                                                    Offline
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                                <a href="#!" className="text-inherit">
                                                                    <div className="d-flex justify-content-between align-items-center py-3 px-4 chat-item">
                                                                        {/* media */}
                                                                        <div className="d-flex">
                                                                            <div className="avatar avatar-md avatar-indicators avatar-online">
                                                                                <img
                                                                                    src="../assets/images/avatar/avatar-5.jpg"
                                                                                    alt="Image"
                                                                                    className="rounded-circle"
                                                                                />
                                                                            </div>
                                                                            {/* media body */}
                                                                            <div className=" ms-2">
                                                                                <h5 className="mb-0">Tushar Mishra</h5>
                                                                                <p className="mb-0 text-muted text-truncate">
                                                                                    Offline
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-9 col-xl-8 col-md-12 col-12">
                                    {/* chat list */}
                                    <div className="chat-body w-100 h-100">
                                        <div className="card-header sticky-top  ">
                                            <div className="d-flex justify-content-between align-items-center">
                                                {/* media */}
                                                <div
                                                    className="d-flex align-items-center"
                                                    id="active-chat-user"
                                                >
                                                    <a href="#!" className=" d-xl-none d-block" data-close="">
                                                        <i data-feather="arrow-left" />
                                                    </a>
                                                    <div className="avatar avatar-md avatar-indicators avatar-online ms-3">
                                                        <img
                                                            src="../assets/images/avatar/avatar-4.jpg"
                                                            alt="Image"
                                                            className="rounded-circle"
                                                        />
                                                    </div>
                                                    {/* media body */}
                                                    <div className=" ms-2">
                                                        <h4 className="mb-0">Sharad Mishra</h4>
                                                        <p className="mb-0 text-muted">Online</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <a
                                                        href="#!"
                                                        className="btn btn-ghost btn-icon btn-md rounded-circle texttooltip"
                                                        data-template="voiceCall"
                                                    >
                                                        <i data-feather="phone-call" className="icon-xs" />
                                                        <div id="voiceCall" className="d-none">
                                                            <span>Voice Call</span>
                                                        </div>
                                                    </a>
                                                    <a
                                                        href="#!"
                                                        className="btn btn-ghost btn-icon btn-md rounded-circle texttooltip"
                                                        data-template="video"
                                                    >
                                                        <i data-feather="video" className="icon-xs" />
                                                        <div id="video" className="d-none">
                                                            <span>Video Call</span>
                                                        </div>
                                                    </a>
                                                    <a
                                                        href="#!"
                                                        className="btn btn-ghost btn-icon btn-md rounded-circle texttooltip"
                                                        data-template="addUser"
                                                    >
                                                        <i data-feather="user-plus" className="icon-xs" />
                                                        <div id="addUser" className="d-none">
                                                            <span>Add Users</span>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div
                                                className="card-body"
                                                id="conversation-list"
                                                data-simplebar=""
                                                style={{ height: 650, overflow: "auto" }}
                                            >
                                                {/* media */}
                                                <div className="d-flex w-lg-40 mb-4">
                                                    <img
                                                        src="../assets/images/avatar/avatar-4.jpg"
                                                        alt="Image"
                                                        className="rounded-circle avatar-md user-avatar"
                                                    />
                                                    {/* media body */}
                                                    <div className=" ms-3">
                                                        <small>
                                                            <span className="username">Sharad Mishra</span> ,
                                                            09:35
                                                        </small>
                                                        <div className="d-flex">
                                                            <div className="card mt-2 rounded-top-md-left-0 border">
                                                                <div className="card-body p-3">
                                                                    <p className="mb-0 text-dark">
                                                                        Hello, Setup the github repo for bootstrap admin
                                                                        dashboard.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="ms-2 mt-2">
                                                                {/* dropdown */}
                                                                <div className="dropdown dropend">
                                                                    <a
                                                                        className="btn btn-ghost btn-icon btn-sm rounded-circle"
                                                                        href="#!"
                                                                        role="button"
                                                                        id="dropdownMenuLink"
                                                                        data-bs-toggle="dropdown"
                                                                        aria-haspopup="true"
                                                                        aria-expanded="false"
                                                                    >
                                                                        <i
                                                                            data-feather="more-vertical"
                                                                            className="icon-xs"
                                                                        />
                                                                    </a>
                                                                    <div
                                                                        className="dropdown-menu"
                                                                        aria-labelledby="dropdownMenuLink"
                                                                    >
                                                                        <a className="dropdown-item" href="#!">
                                                                            <i
                                                                                className="dropdown-item-icon"
                                                                                data-feather="copy"
                                                                            />
                                                                            Copy
                                                                        </a>
                                                                        <a className="dropdown-item" href="#!">
                                                                            <i
                                                                                className="dropdown-item-icon"
                                                                                data-feather="corner-up-right"
                                                                            />
                                                                            Reply
                                                                        </a>
                                                                        <a className="dropdown-item" href="#!">
                                                                            <i
                                                                                className=" dropdown-item-icon"
                                                                                data-feather="corner-up-left"
                                                                            />
                                                                            Forward
                                                                        </a>
                                                                        <a className="dropdown-item" href="#!">
                                                                            <i
                                                                                className="dropdown-item-icon"
                                                                                data-feather="star"
                                                                            />
                                                                            Favourite
                                                                        </a>
                                                                        <a className="dropdown-item" href="#!">
                                                                            <i
                                                                                className="dropdown-item-icon"
                                                                                data-feather="trash"
                                                                            />
                                                                            Delete
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-end mb-4">
                                                    {/* media */}
                                                    <div className="d-flex w-lg-40">
                                                        {/* media body */}
                                                        <div className=" me-3 text-end">
                                                            <small> 09:39</small>
                                                            <div className="d-flex">
                                                                <div className="me-2 mt-2">
                                                                    {/* dropdown */}
                                                                    <div className="dropdown dropstart">
                                                                        <a
                                                                            className="btn btn-ghost btn-icon btn-sm rounded-circle"
                                                                            href="#!"
                                                                            role="button"
                                                                            id="dropdownMenuLinkTwo"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-haspopup="true"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <i
                                                                                data-feather="more-vertical"
                                                                                className="icon-xs"
                                                                            />
                                                                        </a>
                                                                        {/* dropdown menu */}
                                                                        <div
                                                                            className="dropdown-menu"
                                                                            aria-labelledby="dropdownMenuLinkTwo"
                                                                        >
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i
                                                                                    className="dropdown-item-icon"
                                                                                    data-feather="copy"
                                                                                />
                                                                                Copy
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                {" "}
                                                                                <i
                                                                                    className="dropdown-item-icon"
                                                                                    data-feather="edit"
                                                                                />
                                                                                Edit
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i
                                                                                    className="dropdown-item-icon"
                                                                                    data-feather="corner-up-right"
                                                                                />
                                                                                Reply
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i
                                                                                    className=" dropdown-item-icon"
                                                                                    data-feather="corner-up-left"
                                                                                />
                                                                                Forward
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i
                                                                                    className="dropdown-item-icon"
                                                                                    data-feather="star"
                                                                                />
                                                                                Favourite
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i
                                                                                    className="dropdown-item-icon"
                                                                                    data-feather="trash"
                                                                                />
                                                                                Delete
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* card */}
                                                                <div className="card mt-2 rounded-top-md-end-0 bg-primary text-white ">
                                                                    {/* card body */}
                                                                    <div className="card-body text-start p-3">
                                                                        <p className="mb-0">
                                                                            Yes, Currently working on the today evening i
                                                                            will up the admin dashboard template.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* img */}
                                                        <img
                                                            src="../assets/images/avatar/avatar-11.jpg"
                                                            alt="Image"
                                                            className="rounded-circle avatar-md"
                                                        />
                                                    </div>
                                                </div>
                                                {/* media */}
                                                <div className="d-flex w-lg-40 mb-4">
                                                    <img
                                                        src="../assets/images/avatar/avatar-4.jpg"
                                                        alt="Image"
                                                        className="rounded-circle avatar-md user-avatar"
                                                    />
                                                    {/* media body */}
                                                    <div className=" ms-3">
                                                        <small>
                                                            <span className="username">Sharad Mishra</span> ,
                                                            09:42
                                                        </small>
                                                        <div className="d-flex">
                                                            <div className="card mt-2 rounded-top-md-left-0 border">
                                                                <div className="card-body p-3">
                                                                    <p className="mb-0 text-dark">Thank you</p>
                                                                </div>
                                                            </div>
                                                            <div className="ms-2 mt-2">
                                                                {/* dropdown */}
                                                                <div className="dropdown dropend">
                                                                    <a
                                                                        className="btn btn-ghost btn-icon btn-sm rounded-circle"
                                                                        href="#!"
                                                                        role="button"
                                                                        id="dropdownMenuLinkThree"
                                                                        data-bs-toggle="dropdown"
                                                                        aria-haspopup="true"
                                                                        aria-expanded="false"
                                                                    >
                                                                        <i
                                                                            data-feather="more-vertical"
                                                                            className="icon-xs"
                                                                        />
                                                                    </a>
                                                                    <div
                                                                        className="dropdown-menu"
                                                                        aria-labelledby="dropdownMenuLinkThree"
                                                                    >
                                                                        <a className="dropdown-item" href="#!">
                                                                            <i
                                                                                className="dropdown-item-icon"
                                                                                data-feather="copy"
                                                                            />
                                                                            Copy
                                                                        </a>
                                                                        <a className="dropdown-item" href="#!">
                                                                            <i
                                                                                className="dropdown-item-icon"
                                                                                data-feather="corner-up-right"
                                                                            />
                                                                            Reply
                                                                        </a>
                                                                        <a className="dropdown-item" href="#!">
                                                                            <i
                                                                                className=" dropdown-item-icon"
                                                                                data-feather="corner-up-left"
                                                                            />
                                                                            Forward
                                                                        </a>
                                                                        <a className="dropdown-item" href="#!">
                                                                            <i
                                                                                className="dropdown-item-icon"
                                                                                data-feather="star"
                                                                            />
                                                                            Favourite
                                                                        </a>
                                                                        <a className="dropdown-item" href="#!">
                                                                            <i
                                                                                className="dropdown-item-icon"
                                                                                data-feather="trash"
                                                                            />
                                                                            Delete
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-end mb-4">
                                                    {/* media */}
                                                    <div className="d-flex">
                                                        {/* media body */}
                                                        <div className=" me-3 text-end">
                                                            <small> 09:48</small>
                                                            <div className="d-flex justify-content-end">
                                                                <div className="me-2 mt-2">
                                                                    {/* dropdown */}
                                                                    <div className="dropdown dropstart">
                                                                        <a
                                                                            className="btn btn-ghost btn-icon btn-sm rounded-circle"
                                                                            href="#!"
                                                                            role="button"
                                                                            id="dropdownMenuLinkOne"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-haspopup="true"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <i
                                                                                data-feather="more-vertical"
                                                                                className="icon-xs"
                                                                            />
                                                                        </a>
                                                                        {/* dropdown menu */}
                                                                        <div
                                                                            className="dropdown-menu"
                                                                            aria-labelledby="dropdownMenuLinkOne"
                                                                        >
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i
                                                                                    className="dropdown-item-icon"
                                                                                    data-feather="copy"
                                                                                />
                                                                                Copy
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i
                                                                                    className="dropdown-item-icon"
                                                                                    data-feather="edit"
                                                                                />
                                                                                Edit
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i
                                                                                    className=" dropdown-item-icon"
                                                                                    data-feather="corner-up-right"
                                                                                />
                                                                                Reply
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i
                                                                                    className=" dropdown-item-icon"
                                                                                    data-feather="corner-up-left"
                                                                                />
                                                                                Forward
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i
                                                                                    className="dropdown-item-icon"
                                                                                    data-feather="star"
                                                                                />
                                                                                Favourite
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i
                                                                                    className="dropdown-item-icon"
                                                                                    data-feather="trash"
                                                                                />
                                                                                Delete
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* card */}
                                                                <div className="card mt-2 rounded-top-md-end-0 bg-primary text-white">
                                                                    {/* card body */}
                                                                    <div className="card-body text-start p-3">
                                                                        <p className="mb-0">You are most welcome.</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* img */}
                                                        <img
                                                            src="../assets/images/avatar/avatar-11.jpg"
                                                            alt="Image"
                                                            className="rounded-circle avatar-md"
                                                        />
                                                    </div>
                                                </div>
                                                {/* media */}
                                                <div className="d-flex w-lg-40 mb-4">
                                                    {/* img */}
                                                    <img
                                                        src="../assets/images/avatar/avatar-4.jpg"
                                                        alt="Image"
                                                        className="rounded-circle avatar-md user-avatar"
                                                    />
                                                    {/* media body */}
                                                    <div className=" ms-3">
                                                        <small>
                                                            <span className="username">Sharad Mishra</span> ,
                                                            09:50
                                                        </small>
                                                        <div className="d-flex">
                                                            {/* card */}
                                                            <div className="card mt-2 rounded-top-md-left-0 border">
                                                                <div className="card-body p-3">
                                                                    <p className="mb-0 text-dark">
                                                                        After complete this we working on React/Next.js
                                                                        based admin dasboard template.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="ms-2 mt-2">
                                                                {/* dropdown */}
                                                                <div className="dropdown dropend">
                                                                    <a
                                                                        className="btn btn-ghost btn-icon btn-sm rounded-circle"
                                                                        href="#!"
                                                                        role="button"
                                                                        id="dropdownMenuLinkFour"
                                                                        data-bs-toggle="dropdown"
                                                                        aria-haspopup="true"
                                                                        aria-expanded="false"
                                                                    >
                                                                        <i
                                                                            data-feather="more-vertical"
                                                                            className="icon-xs"
                                                                        />
                                                                    </a>
                                                                    <div
                                                                        className="dropdown-menu"
                                                                        aria-labelledby="dropdownMenuLinkFour"
                                                                    >
                                                                        <a className="dropdown-item" href="#!">
                                                                            <i
                                                                                className="dropdown-item-icon"
                                                                                data-feather="copy"
                                                                            />
                                                                            Copy
                                                                        </a>
                                                                        <a className="dropdown-item" href="#!">
                                                                            <i
                                                                                className="dropdown-item-icon"
                                                                                data-feather="corner-up-right"
                                                                            />
                                                                            Reply
                                                                        </a>
                                                                        <a className="dropdown-item" href="#!">
                                                                            <i
                                                                                className=" dropdown-item-icon"
                                                                                data-feather="corner-up-left"
                                                                            />
                                                                            Forward
                                                                        </a>
                                                                        <a className="dropdown-item" href="#!">
                                                                            <i
                                                                                className="dropdown-item-icon"
                                                                                data-feather="star"
                                                                            />
                                                                            Favourite
                                                                        </a>
                                                                        <a className="dropdown-item" href="#!">
                                                                            <i
                                                                                className="dropdown-item-icon"
                                                                                data-feather="trash"
                                                                            />
                                                                            Delete
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-end mb-4">
                                                    {/* media */}
                                                    <div className="d-flex">
                                                        {/* media body */}
                                                        <div className=" me-3 text-end">
                                                            <small>09:52</small>
                                                            <div className="d-flex justify-content-end">
                                                                <div className="me-2 mt-2">
                                                                    {/* dropdown */}
                                                                    <div className="dropdown dropstart">
                                                                        <a
                                                                            className="btn btn-ghost btn-icon btn-sm rounded-circle"
                                                                            href="#!"
                                                                            role="button"
                                                                            id="dropdownMenuLinkSix"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-haspopup="true"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <i
                                                                                data-feather="more-vertical"
                                                                                className="icon-xs"
                                                                            />
                                                                        </a>
                                                                        <div
                                                                            className="dropdown-menu"
                                                                            aria-labelledby="dropdownMenuLinkSix"
                                                                        >
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i
                                                                                    className="dropdown-item-icon"
                                                                                    data-feather="copy"
                                                                                />
                                                                                Copy
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i
                                                                                    className=" dropdown-item-icon"
                                                                                    data-feather="edit"
                                                                                />
                                                                                Edit
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i
                                                                                    className="dropdown-item-icon"
                                                                                    data-feather="corner-up-right"
                                                                                />
                                                                                Reply
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i
                                                                                    className=" dropdown-item-icon"
                                                                                    data-feather="corner-up-left"
                                                                                />
                                                                                Forward
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i
                                                                                    className="dropdown-item-icon"
                                                                                    data-feather="star"
                                                                                />
                                                                                Favourite
                                                                            </a>
                                                                            <a className="dropdown-item" href="#!">
                                                                                <i
                                                                                    className="dropdown-item-icon"
                                                                                    data-feather="trash"
                                                                                />
                                                                                Delete
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* card */}
                                                                <div className="card mt-2 rounded-top-md-end-0 bg-primary text-white">
                                                                    {/* card body */}
                                                                    <div className="card-body text-start p-3">
                                                                        <p className="mb-0">
                                                                            Yes, we work on the react and next.js
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* img */}
                                                        <img
                                                            src="../assets/images/avatar/avatar-11.jpg"
                                                            alt="Image"
                                                            className="rounded-circle avatar-md"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* chat footer */}
                                            <div className="card-footer border-top-0 chat-footer mt-auto rounded-bottom">
                                                <div className="mt-1">
                                                    <form id="chatinput-form">
                                                        <div className="position-relative">
                                                            <input
                                                                className="form-control"
                                                                placeholder="Type a New Message"
                                                                id="chat-input"
                                                            />
                                                        </div>
                                                        <div className="position-absolute end-0 top-0 mt-4 me-4">
                                                            <button
                                                                type="submit"
                                                                className="fs-3 btn text-primary btn-focus-none"
                                                            >
                                                                <i className="bi bi-send" />
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="mt-3 d-flex">
                                                    <div>
                                                        <a href="#!" className="text-inherit me-2 fs-4">
                                                            <i className="bi-emoji-smile" />
                                                        </a>
                                                        <a href="#!" className="text-inherit me-2 fs-4">
                                                            <i className="bi-paperclip" />
                                                        </a>
                                                        <a href="#!" className="text-inherit me-3   fs-4">
                                                            <i className="bi-mic" />
                                                        </a>
                                                    </div>
                                                    <div className="dropdown">
                                                        <a
                                                            href="#!"
                                                            className="text-inherit fs-4"
                                                            id="moreAction"
                                                            data-bs-toggle="dropdown"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                        >
                                                            <i className="fe fe-more-horizontal" />
                                                        </a>
                                                        <div
                                                            className="dropdown-menu"
                                                            aria-labelledby="moreAction"
                                                        >
                                                            <a className="dropdown-item" href="#!">
                                                                Action
                                                            </a>
                                                            <a className="dropdown-item" href="#!">
                                                                Another action
                                                            </a>
                                                            <a className="dropdown-item" href="#!">
                                                                Something else here
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat
