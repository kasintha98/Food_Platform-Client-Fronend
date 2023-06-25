import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PhoneInput from "react-phone-number-input";
import Button from "react-bootstrap/Button";
import validator from "validator";
import {
  GetAddress,
  GetCustomer,
  UpdateUserDetails,
  AddAddress,
} from "../../actions";
import { signup } from "../../actions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "./style.css";

const QRCodeModal = () => {
  const [show, setShow] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setShow(true);
  }, []);

  const validatePhoneNumber = (number) => {
    const isValidPhoneNumber = validator.isMobilePhone(number);
    return isValidPhoneNumber;
  };

  const handleproceed = () => {

    // var mobNo = mobileNumber.replace(/\+/g,"%2B");
    console.log("mobileNumber ..",mobileNumber);
    console.log("mobileNumber..end");

    if (!validatePhoneNumber(mobileNumber)) {
      return toast.error("Invalid Phone Number");
    }
    dispatch(GetCustomer(mobileNumber)).then((res) => {
      console.log("GetCustomer response..");
      console.log(res);
      console.log("GetCustomer response..end");
      // if (res[0].hasOwnProperty('id')) {
      // if (res.id) {
        if(res.length > 0){
        const userid = res[0].id;
        dispatch(GetAddress(mobileNumber)).then((res) => {
          console.log("aaa<<<res", res);
          if (res[0]?.id) {
            let qr = {
              mobile: mobileNumber,
              name: name,
              userid: userid,
              addressid: res[0].id,
            };
            
            console.log("QR Object Before set to local Storage EXIST USER");
            console.log(qr);
            console.log("QR Object Log EXIST USER ... END");

            // localStorage.setItem("qr", JSON.stringify(qr));
            if(qr != null){
              console.log("QR Object is Not Null");
              localStorage.setItem("qr", JSON.stringify(qr));
            }else{
              console.log("QR Object is Null");
            }
            
            toast.success("User Retrieved Successfully !");
          }
        });
        setShow(false);
      } else {
        dispatch(signup(mobileNumber)).then((res) => {
          if (res.data) {
            const payload = { ...res.data, firstName: name };
            dispatch(UpdateUserDetails(payload));
            const userid =
              parseInt(localStorage.getItem("userId")) || res.data.id;
            const userObj = JSON.parse(localStorage.getItem("deliveryType"));
            let addressObj = {
              mobileNumber: mobileNumber,
              customerAddressType: "office",
              address1: userObj?.address1,
              address2: userObj?.address2,
              city: userObj?.city,
              state: "",
              landmark: "",
              zipCode: parseInt(userObj?.zipCode),
            };
            dispatch(AddAddress(addressObj)).then((res) => {
              let qr = {
                mobile: mobileNumber,
                name: name,
                userid: userid,
                addressid: res?.data.id,
              };

              console.log("QR Object Before set to local Storage NEW USER");
              console.log(qr);
              console.log("QR Object Log NEW USER ... END");

              if(qr != null){
                console.log("QR Object is Not Null");
                localStorage.setItem("qr", JSON.stringify(qr));
              }else{
                console.log("QR Object is Null");
              }
            });
          }
        });
        setShow(false);
      }
    });
  };

  return (
    <div>
      <Modal show={show}>
        <Modal.Header style={{ backgroundColor: "#82BB37" }}>
          <Modal.Title>ENTER NAME & PHONE NUMBER</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "rgb(233,237,239)" }}>
          <Container>
            <Row style={{ marginBottom: "10px" }}>
              <Col xs={4}>
                <label
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    marginRight: "0.5rem",
                  }}
                >
                  Name
                </label>
              </Col>
              <Col xs={8}>
                <input
                  style={{
                    fontSize: "0.875rem",
                    width: "100%",
                    border: "2px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                  }}
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Col xs={4}>
                <label
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    marginRight: "0.5rem",
                  }}
                >
                  Phone*
                </label>
              </Col>
              <Col xs={8}>
                <PhoneInput
                  defaultCountry="IN"
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={setMobileNumber}
                  // onKeyDown={onKeyDownHandler}
                  className="PhoneInput"
                  inputClassName="PhoneInputInput"
                />
              </Col>
            </Row>
            <Row>
              <Button
                style={{
                  backgroundColor: "#82BB37",
                  width: "40%",
                  margin: "auto",
                  border: "none",
                }}
                onClick={handleproceed}
              >
                PROCEED
              </Button>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default QRCodeModal;
