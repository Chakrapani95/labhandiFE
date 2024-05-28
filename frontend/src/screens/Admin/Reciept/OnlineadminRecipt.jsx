import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Converter, hiIN } from 'any-number-to-words';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Moment from 'moment-js';
import moment from 'moment';
import { serverInstance } from '../../../API/ServerInstance';
import { backendUrl } from '../../../config/config';
import './cashrecipt.css';
const converter = new Converter(hiIN);
const OnlineadminRecipt = ({ setopendashboard, setshowreciept, onlineId }) => {
  const location = useLocation();
  const componentRef = useRef();
  const [isData, setisData] = React.useState(null);
  const navigation = useNavigate();

  function printDiv() {
    navigation('/admin-panel/reports/printcontent', {
      state: {
        data: isData,
      },
    });
  }

  function down() {
    console.log('cliii');
    const input = document.getElementById('receipt');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4', false);
      pdf.addImage(imgData, 'PNG', 0, 0, 600, 0, undefined, false);
      pdf.save('download.pdf');
    });
  }

  useEffect(() => {
    setopendashboard(true);

    if (location.state?.userdata) {
      setisData(location.state?.userdata);
    }
  }, []);

  return (
    <>
      <div>
        <div
          className="button_div_print_download"
          style={{ marginBottom: '1rem', marginTop: '3rem' }}
        >
          <button onClick={() => navigation(-1)}>Back</button>

          <div />
        </div>
        <div className="main-certificate" id="receipt" ref={componentRef}>
          <div className="topinfo-flex">
            {/* <p>E-mail:demo@gmail.com</p>  */}
            <p>ऊँ ह्लीं अर्हँ श्री पद्मप्रभ जिनेंद्राय नमों नमः
              ॐ ह्लीं आचार्य श्री विद्यासागर जी मुनिंद्राय नमों नमः</p>
            {/* <p>Web:www.demo.com</p> */}
          </div>
          <div className="main-head">
            <div className="main-head-container">
              <span className="hesad-sn">
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
                  <h2>दान रसीद नं : </h2>
                  <h2 className="font_bold_in_donation">
                    &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                    {isData?.RECEIPT_NO
                      ? isData?.RECEIPT_NO
                      : isData?.ReceiptNo}
                  </h2>
                </span>

                {isData && isData.modeOfDonation === '4' ? (
                  <>
                    {isData &&
                      isData.elecItemDetails &&
                      isData.modeOfDonation === '4' &&
                      isData.elecItemDetails[0].quantity && (
                        <>
                          <span className="leftitems ">
                            <h2>मद:</h2>
                            <h2 className="font_bold_in_donation">
                              {isData &&
                                isData.elecItemDetails &&
                                isData.elecItemDetails[0].type}
                            </h2>
                          </span>
                        </>
                      )}
                    {isData &&
                      isData.elecItemDetails &&
                      isData.modeOfDonation === '4' &&
                      isData.elecItemDetails[0].quantity && (
                        <>
                          <span className="leftitems ">
                            <h2>संख्या:</h2>
                            <h2 className="font_bold_in_donation">
                              {isData && isData?.TYPE
                                ? isData?.TYPE
                                : isData &&
                                  isData.elecItemDetails &&
                                  isData.elecItemDetails[0].quantity}
                            </h2>
                          </span>
                          <span className="leftitems ">
                            <h2>वजन:</h2>
                            <h2
                              className="font_bold_in_donation"
                              style={{ marginBottom: '1rem' }}
                            >
                              {isData &&
                                isData.elecItemDetails &&
                                isData.elecItemDetails[0].size}
                              {isData &&
                                isData.elecItemDetails &&
                                isData.elecItemDetails[0].unit}
                            </h2>
                          </span>
                        </>
                      )}
                  </>
                ) : (
                  <></>
                )}

                {isData && isData.modeOfDonation === 4 ? (
                  <>
                    {isData &&
                      isData.elecItemDetails &&
                      isData.modeOfDonation === 4 &&
                      isData.elecItemDetails[0].quantity && (
                        <>
                          <span className="leftitems ">
                            <h2>मद:</h2>
                            <h2 className="font_bold_in_donation">
                              {isData &&
                                isData.elecItemDetails &&
                                isData.elecItemDetails[0].type}
                            </h2>
                          </span>
                        </>
                      )}
                    {isData &&
                      isData.elecItemDetails &&
                      isData.modeOfDonation === 4 &&
                      isData.elecItemDetails[0].quantity && (
                        <>
                          <span className="leftitems ">
                            <h2>संख्या:</h2>
                            <h2 className="font_bold_in_donation">
                              {isData && isData?.TYPE
                                ? isData?.TYPE
                                : isData &&
                                  isData.elecItemDetails &&
                                  isData.elecItemDetails[0].quantity}
                            </h2>
                          </span>
                          <span className="leftitems ">
                            <h2>वजन:</h2>
                            <h2
                              className="font_bold_in_donation"
                              style={{ marginBottom: '1rem' }}
                            >
                              {isData &&
                                isData.elecItemDetails &&
                                isData.elecItemDetails[0].size}
                              {isData &&
                                isData.elecItemDetails &&
                                isData.elecItemDetails[0].unit}
                            </h2>
                          </span>
                        </>
                      )}
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="rightdata">
                <span className="rightitems">
                  <h2>दिनांक :</h2>
                  <h2 className="font_bold_in_donation">
                    {isData && isData?.elecItemDetails ? (
                      <>
                        {Moment(isData?.donation_date).format('DD-MM-YYYY')}:
                        {moment(isData?.donation_time, 'HH:mm:ss').format(
                          'hh:mm A',
                        )}
                      </>
                    ) : (
                      <>
                        {Moment(isData?.DATE_OF_DAAN).format('DD-MM-YYYY')}:
                        {moment(isData?.TIME_OF_DAAN, 'HH:mm:ss').format(
                          'hh:mm A',
                        )}
                      </>
                    )}
                  </h2>
                </span>

                {isData &&
                  isData.elecItemDetails &&
                  isData.modeOfDonation === 3 && (
                    <>
                      <span className="rightitems">
                        <h2>माध्यम :</h2>

                        <h2 className="font_bold_in_donation">
                          {isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0]?.BankName}
                          {isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0].ChequeNo}
                        </h2>
                      </span>
                    </>
                  )}

                {isData &&
                  isData.elecItemDetails &&
                  isData.modeOfDonation === '3' && (
                    <>
                      <span className="rightitems">
                        <h2>माध्यम :</h2>

                        <h2 className="font_bold_in_donation">
                          {isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0].BankName}
                          {isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0].ChequeNo}
                        </h2>
                      </span>
                    </>
                  )}

                {isData &&
                  isData.elecItemDetails &&
                  isData.modeOfDonation === '1' &&
                  isData.elecItemDetails[0].BankName && (
                    <>
                      <span className="rightitems">
                        <h2>माध्यम:</h2>

                        <h2 className="font_bold_in_donation">
                          {isData && isData.elecItemDetails[0].BankName}
                        </h2>
                      </span>
                    </>
                  )}
                {isData &&
                  isData.elecItemDetails &&
                  isData.modeOfDonation === 1 &&
                  isData.elecItemDetails[0].BankName && (
                    <>
                      <span className="rightitems">
                        <h2>माध्यम:</h2>

                        <h2 className="font_bold_in_donation">
                          {isData && isData.elecItemDetails[0].BankName}
                        </h2>
                      </span>
                    </>
                  )}

                {isData && isData?.modeOfDonation === '2' && (
                  <span className="rightitems">
                    <h2>विवरण :</h2>
                    <h2 className="font_bold_in_donation">
                      {isData &&
                        isData.elecItemDetails &&
                        isData.elecItemDetails[0].remark}
                    </h2>
                  </span>
                )}

                {isData && isData?.modeOfDonation === 2 && (
                  <span className="rightitems">
                    <h2>विवरण :</h2>
                    <h2 className="font_bold_in_donation">
                      {isData &&
                        isData.elecItemDetails &&
                        isData.elecItemDetails[0].remark}
                    </h2>
                  </span>
                )}

                {isData &&
                  isData.elecItemDetails &&
                  isData.modeOfDonation === '4' &&
                  isData.elecItemDetails[0].itemType && (
                    <>
                      <span className="rightitems">
                        <h2>सामग्री का नाम:</h2>
                        <h2 className="font_bold_in_donation">
                          {isData && isData?.TYPE
                            ? isData?.TYPE
                            : isData &&
                              isData.elecItemDetails &&
                              isData.elecItemDetails[0].itemType}
                        </h2>
                      </span>
                    </>
                  )}

                {isData &&
                  isData.elecItemDetails &&
                  isData.modeOfDonation === 4 &&
                  isData.elecItemDetails[0].itemType && (
                    <>
                      <span className="rightitems">
                        <h2>सामग्री का नाम:</h2>
                        <h2 className="font_bold_in_donation">
                          {isData && isData?.TYPE
                            ? isData?.TYPE
                            : isData &&
                              isData.elecItemDetails &&
                              isData.elecItemDetails[0].itemType}
                        </h2>
                      </span>
                    </>
                  )}

                {isData &&
                  isData.elecItemDetails &&
                  isData.modeOfDonation === '4' &&
                  isData.elecItemDetails[0].amount && (
                    <>
                      <span className="rightitems">
                        <h2>विवरण :</h2>
                        <h2 className="font_bold_in_donation">
                          {isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0].remark}
                        </h2>
                      </span>
                    </>
                  )}

                {isData &&
                  isData.elecItemDetails &&
                  isData.modeOfDonation === 4 &&
                  isData.elecItemDetails[0].amount && (
                    <>
                      <span className="rightitems">
                        <h2>विवरण :</h2>
                        <h2 className="font_bold_in_donation">
                          {isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0].remark}
                        </h2>
                      </span>
                    </>
                  )}
              </div>
            </div>

            {(isData && isData?.modeOfDonation === '4') ||
            (isData && isData?.modeOfDonation === 4) ? (
              <>
                <span className="rightitems2 " style={{ width: '100%' }}>
                  <h2 style={{ textAlign: 'center' }}>
                    आपके द्वारा प्रदत्त उपहार दान स्वरूप सधन्यवाद प्राप्त हुआ।
                  </h2>
                </span>
              </>
            ) : (
              <>
                {isData && isData?.modeOfDonation === '1' && (
                  <span className="rightitems2 ">
                    <div className="dan_ka_mad">
                      <h2>दान का मद :</h2>
                    </div>
                    <h2 className="center_receipt_format font_bold_in_donation">
                      {isData && isData.elecItemDetails && (
                        <>
                          {isData.elecItemDetails.map((item) => {
                            return (
                              <h2>
                                <b>{item.type}</b> -₹{item.amount} /-
                              </h2>
                            );
                          })}
                        </>
                      )}
                    </h2>
                  </span>
                )}

                <span className="rightitems2 ">
                  <div className="dan_ka_mad">
                    <h2 style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                      दान दातार :
                    </h2>
                  </div>
                  <h2 className="center_receipt_format font_bold_in_donation">
                    &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                    {isData && isData?.gender
                      ? isData && isData?.gender
                      : isData && isData?.GENDER}{' '}
                    &nbsp;
                    {isData?.NAME ? isData?.NAME : isData?.name}
                    {isData?.MobileNo && <>({isData?.MobileNo})</>}
                  </h2>
                </span>

                <span className="rightitems2 ">
                  <div className="dan_ka_mad">
                    <h2>स्थान :</h2>
                  </div>
                  <h2 className="center_receipt_format font_bold_in_donation">
                    &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                    {isData?.ADDRESS ? isData?.ADDRESS : isData?.address}{' '}
                  </h2>
                </span>

                {isData && isData.CHEQUE_NO === '' && (
                  <>
                    <span className="rightitems2 ">
                      <div className="dan_ka_mad">
                        <h2>दान का मद :</h2>
                      </div>
                      <span className="center_receipt_format">
                        {isData && (
                          <>
                            <h2>
                              &nbsp; &nbsp;&nbsp;&nbsp;
                              <b>{isData.TYPE}</b>
                            </h2>
                          </>
                        )}
                      </span>
                    </span>
                  </>
                )}

                {isData && isData.CHEQUE_NO && (
                  <>
                    <span className="rightitems2 ">
                      <div className="dan_ka_mad">
                        <h2>दान का मद :</h2>
                      </div>
                      <span className="center_receipt_format">
                        {isData && (
                          <>
                            <h2>
                              &nbsp; &nbsp;&nbsp;&nbsp;
                              <b>{isData.TYPE}</b>
                            </h2>
                          </>
                        )}
                      </span>
                    </span>
                  </>
                )}

                {isData && isData?.modeOfDonation === 1 && (
                  <span className="rightitems2 ">
                    <div className="dan_ka_mad">
                      <h2>दान का मद :</h2>
                    </div>
                    <span className="center_receipt_format">
                      {isData && isData.elecItemDetails && (
                        <>
                          {isData.elecItemDetails.map((item) => {
                            return (
                              <h2>
                                <b>{item.type}</b> -₹{item.amount} /-
                              </h2>
                            );
                          })}
                        </>
                      )}
                    </span>
                  </span>
                )}

                {isData && isData?.modeOfDonation === '3' && (
                  <span className="rightitems2 ">
                    <div className="dan_ka_mad">
                      <h2>दान का मद :</h2>
                    </div>
                    <span className="center_receipt_format">
                      {isData && isData.elecItemDetails && (
                        <>
                          {isData.elecItemDetails.map((item) => {
                            return (
                              <h2>
                                <b>{item.type}</b> -₹{item.amount} /-
                              </h2>
                            );
                          })}
                        </>
                      )}
                    </span>
                  </span>
                )}

                {isData && isData?.modeOfDonation === 3 && (
                  <span className="rightitems2 ">
                    <div className="dan_ka_mad">
                      <h2>दान का मद :</h2>
                    </div>
                    <span className="center_receipt_format">
                      {isData && isData.elecItemDetails && (
                        <>
                          {isData.elecItemDetails.map((item) => {
                            return (
                              <h2>
                                <b>{item.type}</b> -₹{item.amount} /-
                              </h2>
                            );
                          })}
                        </>
                      )}
                    </span>
                  </span>
                )}

                {isData && isData?.modeOfDonation === '2' && (
                  <div className="rightitems2 ">
                    <div className="dan_ka_mad">
                      <h2>दान का मद :</h2>
                    </div>
                    <span className="center_receipt_format">
                      {isData && isData.elecItemDetails && (
                        <>
                          {isData.elecItemDetails.map((item) => {
                            return (
                              <h2>
                                <b>{item.type}</b> -₹{item.amount} /-
                              </h2>
                            );
                          })}
                        </>
                      )}
                    </span>
                  </div>
                )}

                {isData && isData?.modeOfDonation === 2 && (
                  <span className="rightitems2 ">
                    <div className="dan_ka_mad">
                      <h2>दान का मद :</h2>
                    </div>
                    <div className="center_receipt_format">
                      {isData && isData.elecItemDetails && (
                        <>
                          {isData.elecItemDetails.map((item) => {
                            return (
                              <h2>
                                <b>{item.type}</b> -₹{item.amount} /-
                              </h2>
                            );
                          })}
                        </>
                      )}
                    </div>
                  </span>
                )}

                {isData && isData.CHEQUE_NO && (
                  <>
                    <span className="rightitems2 ">
                      <div className="dan_ka_mad">
                        <h2 style={{ marginBottom: '1rem' }}>विवरण :</h2>
                      </div>
                      <h2 className="center_receipt_format font_bold_in_donation">
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                        {isData && isData?.REMARK}{' '}
                        {isData && isData?.NAME_OF_BANK && (
                          <>
                            ( {isData?.NAME_OF_BANK}
                            {isData?.CHEQUE_NO})
                          </>
                        )}
                      </h2>
                    </span>
                  </>
                )}
                {isData && isData.CHEQUE_NO === '' && (
                  <>
                    <span className="rightitems2 ">
                      <div className="dan_ka_mad">
                        <h2 style={{ marginBottom: '1rem' }}>विवरण :</h2>
                      </div>
                      <h2 className="center_receipt_format  font_bold_in_donation">
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                        {isData && isData?.REMARK}  {isData?.PAN_CARD_No && (
                          <>Pan no : {isData?.PAN_CARD_No}</>
                        )}
                        )
                      </h2>
                    </span>
                  </>
                )}
                <div className="main_div_center">
                  <span className="rightitems2 ">
                    <h2>दान राशि अंको में :</h2>
                    <h2 className="font_bold_in_donation">
                      ₹
                      {isData && isData.AMOUNT ? (
                        isData.AMOUNT
                      ) : (
                        <>
                          {isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails.reduce(
                              (n, { amount }) =>
                                parseFloat(n) + parseFloat(amount),
                              0,
                            )}
                        </>
                      )}
                      /-
                    </h2>
                  </span>
                  {isData && isData?.modeOfDonation === '1' && (
                    <div className="rightitems2  margin_left_div">
                      <h2 style={{ marginLeft: '38%' }}>विवरण :</h2>
                      <h2 className="font_bold_in_donation">
                        {isData &&
                          isData.elecItemDetails &&
                          isData.elecItemDetails[0].remark}
                      </h2>
                    </div>
                  )}

                  {isData && isData?.modeOfDonation === 1 && (
                    <div className="rightitems2  margin_left_div">
                      <h2 style={{ marginLeft: '38%' }}>विवरण :</h2>
                      <h2 className="font_bold_in_donation">
                        {isData &&
                          isData.elecItemDetails &&
                          isData.elecItemDetails[0].remark}
                      </h2>
                    </div>
                  )}

                  {isData && isData?.modeOfDonation === '3' && (
                    <span className="rightitems2  margin_left_div">
                      <h2 style={{ marginLeft: '38%' }}>विवरण :</h2>
                      <h2 className="font_bold_in_donation">
                        {isData &&
                          isData.elecItemDetails &&
                          isData.elecItemDetails[0].remark}
                      </h2>
                    </span>
                  )}

                  {isData && isData?.modeOfDonation === 3 && (
                    <span className="rightitems2  margin_left_div">
                      <h2 style={{ marginLeft: '38%' }}>विवरण :</h2>
                      <h2 className="font_bold_in_donation">
                        {isData &&
                          isData.elecItemDetails &&
                          isData.elecItemDetails[0].remark}
                      </h2>
                    </span>
                  )}
                </div>

                <span className="rightitems2 ">
                  <h2>दान राशि शब्दों में :</h2>
                  {isData && isData?.MODE_OF_DONATION === 'ONLINE' && (
                    <>
                      <h2>
                        <span className="font_bold_in_donation">
                          {isData && converter.toWords(isData?.AMOUNT)}{' '}
                        </span>
                        रूपये ऑनलाइन द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।
                      </h2>
                    </>
                  )}

                  {isData && isData?.MODE_OF_DONATION === 'CHEQUE' && (
                    <>
                      <h2>
                        <span className="font_bold_in_donation">
                          {isData && converter.toWords(isData?.AMOUNT)}
                        </span>
                        रूपये ऑनलाइन चैक द्वारा दान स्वरूप सधन्यवाद प्राप्त
                        हुये।
                      </h2>
                    </>
                  )}

                  {isData && isData.elecItemDetails && (
                    <>
                      <h2 className="font_bold_in_donation">
                        {converter.toWords(
                          isData?.AMOUNT
                            ? isData?.AMOUNT
                            : Number(
                                isData &&
                                  isData.elecItemDetails &&
                                  isData.elecItemDetails.reduce(
                                    (n, { amount }) =>
                                      parseFloat(n) + parseFloat(amount),
                                    0,
                                  ),
                              ),
                          {
                            comma: true,
                          },
                        )}
                      </h2>
                      {isData && isData?.modeOfDonation === '2' && (
                        <h2> रूपये नगद दान स्वरूप सधन्यवाद प्राप्त हुये।</h2>
                      )}
                      {isData && isData?.modeOfDonation === 2 && (
                        <h2> रूपये नगद दान स्वरूप सधन्यवाद प्राप्त हुये।</h2>
                      )}
                      {isData && isData?.modeOfDonation === '1' && (
                        <h2>
                          रूपये बैंक द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।
                        </h2>
                      )}

                      {isData && isData?.modeOfDonation === 1 && (
                        <h2>
                          रूपये बैंक द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।
                        </h2>
                      )}
                      {isData && isData?.modeOfDonation === '3' && (
                        <h2> चैक द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।</h2>
                      )}

                      {isData && isData?.modeOfDonation === 3 && (
                        <h2>चैक द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।</h2>
                      )}
                    </>
                  )}
                </span>
              </>
            )}

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
            <span>
              पद्म भक्त परिवार आपके दान की बहुत बहुत अनुमोदना करता है।
            </span>
            {/* <p>PAN NO- AAHTS00000</p> */}
          </div>
          <div className="signature-point">
            <img src="../../assets/QRimage.png" alt="QR Image" className="QR-image"/>
            {/* <div className="main_div_signature">
              <p>हस्ताक्षर दानदातार</p>
            </div>

            <div className="main_div_signature">
              {isData?.createdBySignature && (
                <>
                  <img
                    src={`${backendUrl}uploads/images/${isData?.createdBySignature}`}
                    alt="signature"
                  />
                </>
              )}

              <p>हस्ताक्षर प्राप्तकर्ता,({isData?.createdBy})</p>
            </div>  */}
          </div>
        </div>
      </div>
      <div className="button_div_print_download">
        <button onClick={() => down()}>Download</button>
        <button onClick={() => printDiv()}>Print</button>
      </div>
    </>
  );
};

export default OnlineadminRecipt;
