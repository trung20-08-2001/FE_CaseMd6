import React, { useState, useEffect } from 'react';
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {

    const [showBackToTop, setShowBackToTop] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset > 300) {
            setShowBackToTop(true);
        } else {
            setShowBackToTop(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>

            <a
                id="scrollUp"
                onClick={scrollToTop}
                style={{ position: "fixed", zIndex: 2147483647, display: "inline", display: showBackToTop ? "block" : "none" }}

            >
                Scroll to top
            </a>

            
            <div className="footer-widget-area bg-violet black-bg pb-58" style={{backgroundColor:"rgb(30, 126, 52)", color:"white"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="social-links mt-25 mb-80">
                                {/* <a>
                                    <i className="fa fa-facebook text-white" />
                                </a>
                                <a>
                                    <i className="fa fa-twitter text-white" />
                                </a>
                                <a>
                                    <i className="fa fa-linkedin text-white" />
                                </a>
                                <a>
                                    <i className="fa fa-google-plus text-white" />
                                </a> */}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-3 col-md-4">
                            <div className="single-footer-widget">
                                <h3 className="text-white text-uppercase mb-18">About Us</h3>
                                <p className="pb-19" style={{color:"whitesmoke"}}>
                                    House rental website is a convenient online platform that helps you easily search and rent apartments, serviced apartments, or private homes that suit your needs. With a diverse database of housing types and locations around the world, this website helps you find the best place to stay for your family or your travels.
                                </p>
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
                            <div className="single-footer-widget" style={{color:"whitesmoke"}}>
                                <h3 className="text-white text-uppercase mb-28">REGULATIONS</h3>
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
                            <div className="single-footer-widget" style={{color:"whitesmoke"}}>
                                <h3 className="text-white text-uppercase mb-17"> INSTRUCT</h3>
                                <ul className="footer-list">
                                    <li>
                                        <a>INTRODUCE</a>
                                    </li>
                                    <li>
                                        <a >QUOTE</a>
                                    </li>
                                    <li>
                                        <a>INSTRUCT</a>
                                    </li>
                                    <li>
                                        <a>SUPPORT</a>
                                    </li>
                                    <li>
                                        <a>RECRUITMENT</a>
                                    </li>
                                    <li>
                                        <a>CONTACT</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-4">
                            <div className="single-footer-widget pull_right" style={{color:"whitesmoke"}}>
                                <h3 className="text-white text-uppercase mb-21" style={{color:"white"}}>CONTACT US</h3>
                                <div className="footer-contact-info mb-24">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/case-module6-79593.appspot.com/o/f-map.png?alt=media&token=d072deec-3250-45a6-b977-840176d89238&_gl=1*tgkxwi*_ga*MTc2NDE0MzExOS4xNjkyNjM1ODM5*_ga_CW55HF8NVT*MTY5NjMwMDUxMy4yNC4xLjE2OTYzMDA1OTIuNjAuMC4w" alt="" />
                                    <span className="pl-40 block">
                                        CodeGym,Mỹ Đình,Nam Từ Liêm,Hà Nội,Việt Nam
                                    </span>
                                </div>
                                <div className="footer-contact-info mb-24">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/case-module6-79593.appspot.com/o/f-phone.png?alt=media&token=abbe844d-d0f7-45f4-9349-d41f75304563&_gl=1*ewf4oh*_ga*MTc2NDE0MzExOS4xNjkyNjM1ODM5*_ga_CW55HF8NVT*MTY5NjMwMDUxMy4yNC4xLjE2OTYzMDA2ODcuNjAuMC4w" alt="" />
                                    <span className="pl-40 block">
                                        Telephone : 0375073496
                                    </span>
                                </div>
                                <div className="footer-contact-info">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/case-module6-79593.appspot.com/o/f-globe.png?alt=media&token=2740fb63-b1dc-4355-b072-0f3bbdf9ea90&_gl=1*2rpg8s*_ga*MTc2NDE0MzExOS4xNjkyNjM1ODM5*_ga_CW55HF8NVT*MTY5NjMwMDUxMy4yNC4xLjE2OTYzMDA3MjguMTkuMC4w" alt="" />
                                    <span className="pl-40 block">
                                        Web : bookinghouse.top
                                    </span>
                                </div>
                                <MenuItem>
                                    <IconButton size="large" aria-label="show 4 new mails" color="white" style={{marginLeft:"-13%"}}>
                                      <div style={{color:"gray"}}> <Badge badgeContent={0} color="error">
                                          <EmailIcon/>
                                      </Badge></div>
                                    </IconButton>
                                    <p style={{color:"white",fontSize:"12px"}}>Email:chungtien2506@gmail.com</p>
                                </MenuItem>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Footer;