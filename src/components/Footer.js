import React from 'react';

const Footer = () => {
    return (
        <>
            <div className="footer-widget-area bg-violet black-bg pb-58">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="social-links mt-25 mb-80">
                                <a href="#">
                                    <i className="fa fa-facebook" />
                                </a>
                                <a href="#">
                                    <i className="fa fa-twitter" />
                                </a>
                                <a href="#">
                                    <i className="fa fa-linkedin" />
                                </a>
                                <a href="#">
                                    <i className="fa fa-google-plus" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-3 col-md-4">
                            <div className="single-footer-widget">
                                <h3 className="text-white text-uppercase mb-21">About Us</h3>
                                <p className="pb-19">
                                    Lorem must explain to you how all this mistaolt cing pleasure and
                                    praising ain wasnad I will give you a complete pain was prexplain to
                                    you lorem
                                </p>
                                <form action="#" id="mc-form" className="mc-form fix">
                                    <div className="subscribe-form">
                                        <input
                                            id="mc-email"
                                            type="email"
                                            name="email"
                                            placeholder="Email for Newsletter"
                                        />
                                        <button id="mc-submit" type="submit">
                                            <i className="fa fa-send" />
                                        </button>
                                    </div>
                                </form>
                                {/* mailchimp-alerts Start */}
                                <div className="mailchimp-alerts text-centre fix text-small">
                                    <div className="mailchimp-submitting" />
                                    {/* mailchimp-submitting end */}
                                    <div className="mailchimp-success" />
                                    {/* mailchimp-success end */}
                                    <div className="mailchimp-error" />
                                    {/* mailchimp-error end */}
                                </div>
                                {/* mailchimp-alerts end */}
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-4 pl-80">
                            <div className="single-footer-widget">
                                <h3 className="text-white text-uppercase mb-28">POPULAR POST</h3>
                                <div className="footer-widget-content">
                                    <h5 className="mb-8">Duplex Villa Design</h5>
                                    <span className="mb-27 block">
              Lorem ipsum dolor sit amet, tur
              <br />
              acinglit sed do eius{" "}
            </span>
                                </div>
                                <div className="footer-widget-content">
                                    <h5 className="mb-8">Real Estate Fest</h5>
                                    <span>
              Lorem ipsum dolor sit amet, tur
              <br />
              acinglit sed do eius{" "}
            </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 d-lg-none d-none d-xl-block pl-80">
                            <div className="single-footer-widget">
                                <h3 className="text-white text-uppercase mb-17">QUICK LINK</h3>
                                <ul className="footer-list">
                                    <li>
                                        <a href="#">Services</a>
                                    </li>
                                    <li>
                                        <a href="#">Agent</a>
                                    </li>
                                    <li>
                                        <a href="#">Properties</a>
                                    </li>
                                    <li>
                                        <a href="#">Features</a>
                                    </li>
                                    <li>
                                        <a href="#">From Blog</a>
                                    </li>
                                    <li>
                                        <a href="#">Contact</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-4">
                            <div className="single-footer-widget pull_right">
                                <h3 className="text-white text-uppercase mb-21">CONTACT US</h3>
                                <div className="footer-contact-info mb-24">
                                    <img src="images/icons/f-map.png" alt="" />
                                    <span className="pl-40 block">
              256, 1st AVE, Manchester
              <br />
              125 , Noth England
            </span>
                                </div>
                                <div className="footer-contact-info mb-24">
                                    <img src="images/icons/f-phone.png" alt="" />
                                    <span className="pl-40 block">
              Telephone : +012 345 678 102
              <br />
              Telephone : +013 445 678 155
            </span>
                                </div>
                                <div className="footer-contact-info">
                                    <img src="images/icons/f-globe.png" alt="" />
                                    <span className="pl-40 block">
              Email : info@example.com
              <br />
              Web : www.example.com
            </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Footer;