import React,{useEffect, useState} from "react";
import "./style.css";
import footerimg from "../../img/footerimg.png";
import { useSelector } from "react-redux";
import yt from "../../img/yt.png";
import tw from "../../img/tw.png";
import wa from "../../img/wa.png";
import ig from "../../img/ig.png";
import { imagePathHome } from "../../urlConfig";

export default function Footer() {
  const [facebookUrl, setFacebookUrl] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [instaUrl, setInstaUrl] = useState("");
  const [youTubeUrl, setYouTubeUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [logoImg, setLogoImg] = useState("");

  const allCss = useSelector((state) => state.store.allActiveCSS);

  useEffect(() => {
    if (allCss != undefined) {
      allCss.forEach((category) => {
        if (category.subCategory == "Facebook") {
          setFacebookUrl(category.imagePath);
        }

        if (category.subCategory == "Instagram") {
          setInstaUrl(category.imagePath);
        }

        if (category.subCategory == "Youtube") {
          setYouTubeUrl(category.imagePath);
        }

        if (category.subCategory == "Whatapp") {
          setWhatsappUrl(category.imagePath);
        }

        if (category.subCategory == "Twitter") {
          setTwitterUrl(category.imagePath);
        }

        if (category.subCategory == "Logo") {
          setLogoImg(imagePathHome+"/"+window.restId+"/"+category.imagePath);
        }

      })
    }
  }, [allCss]);

  const version = useSelector((state) => state.auth.version);

  return (
    <footer className="footer_area section_padding_130_0">
      <div className="container">
        <div className="row">
          {/* Original Code*/}
          {/* <div className="col-12 col-sm-6 col-lg-4">
            <div className="single-footer-widget section_padding_0_130">
              <div className="footer-logo " />
              <img src={footerimg} width="100%" alt="facebook" />
            </div>
            <div className="w-100 text-center">
              {version ? (
                <p style={{ color: "#fff" }}>
                  {version.appEnvironment}: {version.appVersion}
                </p>
              ) : null}
            </div>
          </div> */}

          <div style={{marginTop:'3%',marginBottom:'1%'}} className="col-12 col-sm-6 col-lg-4">
            <div className="single-footer-widget section_padding_0_130">
              <div className="footer-logo " />
              {/* {window.domainName == "hangries.in" ? (
                <img src={footerimg} width="100%" alt="facebook" />
              ) : (
                <img src={logoImg} width="100%" alt="facebook" loading="lazy"/>
              )} */}
                <img src={logoImg} width="100%" alt="facebook" loading="lazy"/>
            </div>
            <div className="w-100 text-center">
              {version ? (
                <p style={{ color: "#fff" }}>
                  {version.appEnvironment}: {version.appVersion}
                </p>
              ) : null}
            </div>
          </div>

          <div className="text-section col-12 col-sm-6 col-lg-8">
            <div className="row">
              {/* Commented Code as suggested by Gurmeet*/}
              {/* Single Widget*/}
              {/* <div className="col-12 col-sm-4 col-lg">
                <div className="single-footer-widget section_padding_0_130">
                  <h5 className="widget-title">Company</h5>
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
              </div> */}

              {/* Commented Code as suggested by Gurmeet*/}
              {/* Single Widget*/}
              {/* <div className="col-12 col-sm-4 col-lg">
                <div className="single-footer-widget section_padding_0_130">
                  <h5 className="widget-title">We Accept</h5>
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
              </div> */}
              {/* Single Widget*/}
              <div style={{marginTop:'-70px',marginBottom:'10px',marginLeft:'40%'}} className="col-12 col-sm-4 col-lg">
                <div className="single-footer-widget section_padding_0_130">
                  {/* Widget Title*/}
                  <h5 className="widget-title">Follow Us</h5>
                  {/* Footer Menu*/}
                  <div className="footer_menu">
                    <ul>
                      <li>
                        {/* <a href="https://www.facebook.com/HangriesOfficial"> */}
                        <a href={facebookUrl}>
                          <i className="fa fa-facebook"> Facebook</i>
                        </a>
                      </li>
                      <li>
                        {/* <a href="https://www.instagram.com/hangriesofficial/"> */}
                        <a href={instaUrl}>
                          <i className="fa fa-instagram"> Instagram</i>
                        </a>
                      </li>
                      <li>
                        {/* <a href="https://www.youtube.com/channel/UCJPY7XvcOOMWNlZcgmxAJLg/featured"> */}
                        <a href={youTubeUrl}>
                          <i className="fa fa-youtube"> Youtube</i>
                        </a>
                      </li>
                      <li>
                        {/* <a href="https://api.whatsapp.com/send?phone=+91-9369522222"> */}
                        <a href={whatsappUrl}>
                          <i className="fa fa-whatsapp"> Whatsapp</i>
                        </a>
                      </li>
                      <li>
                        <a href={twitterUrl}>
                          <i className="fa fa-twitter"> Twitter</i>
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
