import React from "react";
import "./style.css";
import fb from "../../img/fb.png";
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
              <div className="footer-logo mb-3" />
              <p>
                Appland is completely creative, lightweight, clean app landing
                page.
              </p>
              {/* Copywrite Text*/}
              <div className="copywrite-text mb-5">
                <p className="mb-0">&copy; Hangries</p>
              </div>
              {/* Footer Social Area*/}
              <div className="footer_social_area">
                <a
                  href="https://www.facebook.com/HangriesOfficial"
                  data-toggle="tooltip"
                  data-placement="top"
                  title
                  data-original-title="Facebook"
                >
                  <img src={fb} width="30px" alt="facebook" />
                </a>
                <a
                  href="https://www.instagram.com/hangriesofficial/"
                  data-toggle="tooltip"
                  data-placement="top"
                  title
                  data-original-title="Pinterest"
                >
                  <img src={ig} width="30px" alt="ig" />
                </a>
                <a
                  href="https://mobile.twitter.com/hangries_in"
                  data-toggle="tooltip"
                  data-placement="top"
                  title
                  data-original-title="Skype"
                >
                  <img src={tw} width="30px" alt="tw" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCJPY7XvcOOMWNlZcgmxAJLg/featured"
                  data-toggle="tooltip"
                  data-placement="top"
                  title
                  data-original-title="Twitter"
                >
                  <img src={yt} width="30px" alt="yt" />
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=+91-9369522222"
                  data-toggle="tooltip"
                  data-placement="top"
                  title
                  data-original-title="Twitter"
                >
                  <img src={wa} width="30px" alt="wa" />
                </a>
              </div>
            </div>
          </div>
          {/* Single Widget*/}
          <div className="col-12 col-sm-6 col-lg">
            <div className="single-footer-widget section_padding_0_130">
              {/* Widget Title*/}
              <h5 className="widget-title">About</h5>
              {/* Footer Menu*/}
              <div className="footer_menu">
                <ul>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Corporate Sale</a>
                  </li>
                  <li>
                    <a href="#">Terms &amp; Policy</a>
                  </li>
                  <li>
                    <a href="#">Community</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Single Widget*/}
          <div className="col-12 col-sm-6 col-lg">
            <div className="single-footer-widget section_padding_0_130">
              {/* Widget Title*/}
              <h5 className="widget-title">Support</h5>
              {/* Footer Menu*/}
              <div className="footer_menu">
                <ul>
                  <li>
                    <a href="#">Help</a>
                  </li>
                  <li>
                    <a href="#">Support</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Term &amp; Conditions</a>
                  </li>
                  <li>
                    <a href="#">Help &amp; Support</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Single Widget*/}
          <div className="col-12 col-sm-6 col-lg">
            <div className="single-footer-widget section_padding_0_130">
              {/* Widget Title*/}
              <h5 className="widget-title">Contact</h5>
              {/* Footer Menu*/}
              <div className="footer_menu">
                <ul>
                  <li>
                    <a href="#">Call Centre</a>
                  </li>
                  <li>
                    <a href="#">Email Us</a>
                  </li>
                  <li>
                    <a href="#">Term &amp; Conditions</a>
                  </li>
                  <li>
                    <a href="#">Help Center</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
