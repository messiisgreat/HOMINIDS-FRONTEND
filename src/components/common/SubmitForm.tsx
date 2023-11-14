import React, { useState } from 'react';

const SubmitForm = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  // const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (payload) => {
    console.log(payload);
    // background: linear-gradient(0deg, rgba(18, 20, 33, 0.4), rgba(18, 20, 33, 0.4)),
    // linear-gradient(0deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04));
  };
  return (
    <>
      <div className="">
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col"
          style={{
            paddingTop: '32.94px',
            backgroundColor: '#12142166',
            paddingRight: '72px',
            borderRadius: '40px',
            paddingLeft: '72px',
            paddingBottom: '51.94px',
          }}
        >
          <div className="flex justify-between gap-4">
            <div className="submit-input flex flex-col gap-2">
              <label
                htmlFor="fullname"
                className="nato-fontfamily text-lg"
                style={{ lineHeight: '27px', color: '#AAA5A5' }}
              >
                Full name<span className="dark:text-gray-50 text-red-500"></span>
              </label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => {
                  setFullname(e.target.value);
                }}
                name="fullname"
                className=" text-base"
                style={{
                  color: 'black',
                  lineHeight: '24px',
                  fontWeight: 400,
                  borderRadius: '16px',
                  padding: '18px 23px',
                  border: '1px solid #FFFFFF',
                  backgroundColor: 'white',
                  width: '300px',
                  outline: 'none !important',
                }}
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="nato-fontfamily text-lg"
                style={{ lineHeight: '27px', color: '#AAA5A5' }}
              >
                E-mail<span className="text-red-500"></span>
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className=" text-base"
                style={{
                  color: 'black',
                  lineHeight: '24px',
                  fontWeight: 400,
                  borderRadius: '16px',
                  padding: '18px 23px',
                  border: '1px solid #FFFFFF',
                  backgroundColor: 'white',
                  width: '300px',
                  outline: 'none !important',
                }}
                placeholder="Your e-mail"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="nato-fontfamily text-lg"
              style={{ lineHeight: '27px', color: '#AAA5A5', marginTop: '15px' }}
            >
              You can leave a comment:<span className="text-red-500"></span>
            </label>
            <textarea
              rows={4}
              name="message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className=" text-base"
              style={{
                color: 'black',
                lineHeight: '24px',
                fontWeight: 400,
                borderRadius: '16px',
                padding: '18px 23px',
                border: '1px solid #FFFFFF',
                backgroundColor: 'white',
                outline: 'none !important',
              }}
              placeholder="Your comment"
            ></textarea>
          </div>

          <div
            className="absolute flex flex-col items-center justify-start"
            style={{ top: '336px', left: '216px' }}
          >
            <button
              type="submit"
              style={{ paddingLeft: '90.5px', paddingRight: '90.5px' }}
              className="nato-fontfamily rounded-[100px] bg-[#AF50BD] py-5 text-base font-medium uppercase leading-[19.2px]"
            >
              Send request
            </button>
            <div
              className="nato-fontfamily mt-3 text-center text-xs"
              style={{ width: '182px', lineHeight: '15.6px', marginTop: '', color: "#AAA5A5" }}
            >
              By clicking the button, I consent to the processing of personal data
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SubmitForm;
