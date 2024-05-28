import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Converter, hiIN } from 'any-number-to-words';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Moment from 'moment-js';
import moment from 'moment';
import { serverInstance } from '../../../../API/ServerInstance';
import { backendUrl } from '../../../../config/config';
import './cashrecipt.css';
const converter = new Converter(hiIN);
const BhojnalayReceipt = ({ setshowreciept, onlineId }) => {
  const location = useLocation();
  const componentRef = useRef();
  const [isData, setisData] = React.useState(null);
  const navigation = useNavigate();
  const { user } = useSelector((state) => state.userReducer);

  const adminName = sessionStorage.getItem('adminName');

  const empName = sessionStorage.getItem('empName');

  function printDiv() {
    navigation('/admin-panel/reports/printcontent', {
      state: {
        data: isData,
      },
    });
  }

  function down() {
    
    const input = document.getElementById('receipt');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4', false);
      pdf.addImage(imgData, 'PNG', 0, 0, 600, 0, undefined, false);
      pdf.save('download.pdf');
    });
  }

  useEffect(() => {

    setshowreciept(true);

    if (location.state) {
      setisData(location.state?.userdata);
    } else {
      serverInstance(`user/get-bhojnalay?id=${onlineId}`, 'get').then(
        (res) => {
          if (res.status) {
            setisData(res.data[0]);
          }
        },
      );
    }

    console.log('data', isData);
  }, []);

  return (
    <>
      <div>
        <div
          className="button_div_print_download"
          style={{ marginBottom: '1rem' }}
        >
          <button onClick={() => navigation(-1)}>Back</button>

          <div />
        </div>
        <div
          className="main-certificate"
          id="receipt"
          ref={componentRef}
          style={{ marginTop: '1rem' }}
        >
          <div className="topinfo-flex">
              {/* <p>E-mail:demo@gmail.com</p>  */}
              <p>ऊँ ह्लीं अर्हँ श्री पद्मप्रभ जिनेंद्राय नमों नमः
                ॐ ह्लीं आचार्य श्री विद्यासागर जी मुनिंद्राय नमों नमः</p>
              {/* <p>Web:www.demo.com</p> */}
          </div>
          <div className="main-head">
            <div className="main-head-container">
              <span className="hedad-sn">
                <p>&nbsp;</p>
                <h4>&nbsp;</h4>
              </span>
              <span className="head-name">
              <h2>श्री दिगम्बर जैन लाभांडीह</h2>
                <p>(सार्व, न्यास क्रं. 17 - ह)</p>
                <h4>ग्राम- लाभांडीह, तह-धरसीवा, जिला रायपुर 492006(छ.ग.)</h4>
              </span>
              <span className="head-contact">
                  <p>9893085654</p>
                  {/* <p>123456789</p> */}
                <p>दातार प्रति</p>
              </span>
            </div>
          </div>
          <div className="reciptimg">
            <div className="reciptbody">
              <div className="leftdata">
                <span className="leftitems">
                  <h2>भोजनालय रसीद नं : </h2>
                  <h2 className="font_bold_in_donation">
                    {isData?.ReceiptNo
                      ? isData?.ReceiptNo
                      : isData?.ReceiptNo}
                  </h2>
                </span>
                <span className="leftitems">
                  <h2>नाम :</h2>
                  <div>
                    <h2 className="font_bold_in_donation">
                      {isData && isData?.gender
                        ? isData && isData?.gender
                        : isData && isData?.GENDER}{' '}
                      &nbsp;
                      {isData && isData?.Name}
                    </h2>
                  </div>
                </span>
                <span className="leftitems">
                  <h2>टाइम स्लॉट:</h2>

                  <div className="warp_text">
                    <h2 className="font_bold_in_donation">
                      {isData?.Time ? isData?.Time : isData?.Time}{' '}
                    </h2>
                  </div>
                </span>


              </div>
              <div className="rightdata">
                <span className="rightitems">
                  <h2>दिनांक :</h2>
                  <h2 className="font_bold_in_donation">
                    {isData && isData?.DateOfBooking ? (
                      <>
                        {Moment(isData?.DateOfBooking).format('DD-MM-YYYY')}

                      </>
                    ) : (
                      <>
                        {Moment(isData?.DateOfBooking).format('DD-MM-YYYY')}:

                      </>
                    )}
                  </h2>
                </span>

                <span className="rightitems">
                  <h2>मोबाइल नं :</h2>
                  <h2 className="font_bold_in_donation">
                    {isData?.MobileNo ? isData?.MobileNo : user?.MobileNo}
                  </h2>
                </span>

              </div>
            </div>

            <span className="rightitems2 " style={{ marginTop: '1rem' }}>
              <h2>दान राशि अंको में :</h2>
              <h2 className="font_bold_in_donation">
                ₹
                {isData && isData.TotalAmount && (
                  isData.TotalAmount
                )}
                /-
              </h2>
            </span>

            <span className="rightitems2 " style={{ marginTop: '1rem' }}>
              <h2>दान राशि शब्दों में :</h2>

              <>
                <h2>
                  <span className="font_bold_in_donation">
                    {' '}
                    {isData && converter.toWords(isData?.TotalAmount)}{' '}
                  </span>
                  {/* रूपये ऑनलाइन द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये। */}
                </h2>
              </>


            </span>

            <div className="bankjankari">
              <h3>बैंक द्वारा राशि भेजने संबंधी जानकारी</h3>
            </div>
            <div className="bankdetail-container">
              <div className="bankdetails">
                <div className="banks1">
                <h5 className="mr0">ICICI BANK, RAIPUR</h5>
                  <h4 className="mr0">251505000141</h4>
                  <p className="mr0">UTI00000000</p>
                </div>
                {/*
                <div className="banks2">
                  <h5>HDFC BANK, RAIPUR</h5>
                  <h4>000000000000000</h4>
                  <p>HDF00000000</p>
                </div>
                <div className="banks3">
                  <h5>SBI BANK, ADB-RAIPUR</h5>
                  <h4>00000000000</h4>
                  <p>SBI00000000</p>
                </div>  */}
              </div>
            </div>
          </div>

          <div className="note">

          </div>
          <div className="reciept-footer" style={{ marginTop: '2px' }}>
            {/* <span>
              पद्म भक्त परिवार आपके दान की बहुत बहुत अनुमोदना करता है।
            </span> */}
            {/* <p>PAN NO- AAHTS00000</p> */}
          </div>

          <div className="signature-point">
            <img src="../../assets/QRimage.png" alt="QR Image" className="QR-image"/>
            {/* <div className="main_div_signature">
              {isData?.signature && (
                <>
                  <img
                    src={`${backendUrl}uploads/images/${isData?.signature}`}
                    alt="signature"
                  />
                </>
              )}
              <p>हस्ताक्षर दानदातार</p>
            </div>

            <div className="main_div_signature">
              {isData?.adminSignature && (
                <>
                  <img
                    src={`${backendUrl}uploads/images/${isData?.adminSignature}`}
                    alt="signature"
                  />
                </>
              )}

              <p>हस्ताक्षर प्राप्तकर्ता</p>
            </div>  */}
          </div>
        </div>
      </div>
      <div className="button_div_print_download">
        <button onClick={() => down()}>Download</button>
        <p>&nbsp;</p>
      </div>
    </>
  );
};

export default BhojnalayReceipt;
