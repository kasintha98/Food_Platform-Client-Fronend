import React from "react";
import "./style.css";
import footerimg from "../../img/footerimg.png";
import yt from "../../img/yt.png";
import tw from "../../img/tw.png";
import wa from "../../img/wa.png";
import ig from "../../img/ig.png";

export default function Footer() {
  return (
    <footer className="footer_area section_padding_130_0">
      <div className="container">
        <div className="row">
          {/* Single Widget*/}
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="single-footer-widget section_padding_0_130">
              {/* Footer Logo*/}
              <div className="footer-logo " />
              <img src={footerimg} width="100%" alt="facebook" />
            </div>
          </div>
          <div className="text-section col-12 col-sm-6 col-lg-8">
            <div className="row">
              {/* Single Widget*/}
              <div className="col-12 col-sm-4 col-lg">
                <div className="single-footer-widget section_padding_0_130">
                  {/* Widget Title*/}
                  <h5 className="widget-title">Company</h5>
                  {/* Footer Menu*/}
                  <div className="footer_menu">
                    <ul>
                      <li>
                        <a href="#">Join Us</a>
                      </li>
                      <li>
                        <a href="#">About Us</a>
                      </li>
                      <li>
                        <a href="#">Terms of Use</a>
                      </li>
                      <li>
                        <a href="#">Contact Us</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Single Widget*/}
              <div className="col-12 col-sm-4 col-lg">
                <div className="single-footer-widget section_padding_0_130">
                  {/* Widget Title*/}
                  <h5 className="widget-title">We Accept</h5>
                  {/* Footer Menu*/}
                  <div className="footer_menu">
                    <ul>
                      <li>
                        <a href="#">Google Pay</a>
                      </li>
                      <li>
                        <a href="#">PhonePe</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Single Widget*/}
              <div className="col-12 col-sm-4 col-lg">
                <div className="single-footer-widget section_padding_0_130">
                  {/* Widget Title*/}
                  <h5 className="widget-title">Follow Us</h5>
                  {/* Footer Menu*/}
                  <div className="footer_menu">
                    <ul>
                      <li>
                        <a href="https://www.facebook.com/HangriesOfficial">
                          <i class="fa fa-facebook"> Facebook</i>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.instagram.com/hangriesofficial/">
                          <i class="fa fa-instagram"> Instagram</i>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.youtube.com/channel/UCJPY7XvcOOMWNlZcgmxAJLg/featured">
                          <i class="fa fa-youtube"> Youtube</i>
                        </a>
                      </li>
                      <li>
                        <a href="https://api.whatsapp.com/send?phone=+91-9369522222">
                          <i class="fa fa-whatsapp"> Whatsapp</i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
