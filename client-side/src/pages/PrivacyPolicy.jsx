import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <PrivacyContainer>
        <h2><span>Privacy Policy</span></h2>
        <div className="paragraph">
            <p>Welcome to Hello Food Ltd. We respect your privacy and want to protect your personal information. As a customer centric company we are set to protect customer rights and purchase safety to the maximum. To learn more, please read this Privacy Policy.</p>
            <p>What Do We Do with Your Information?</p>
            <p>Hello Food website or app may collect various types of required information if a customer wants to place an order for the desired product he/she wants to buy using the website or app. When a customer purchases something from Hello Food through the website or app, as part of the buying and selling process, Hello Food will collect the personal information of the customer such as his/her name, contact number, delivery address and email address etc.. The company will receive, store and process this data for preparing customers purchased orders on the eCommerce site and will save it for any possible future allegation. Hello Food usually collects personal information such as customers' title, name, gender, date of birth, email address, postal address, delivery address, telephone number, mobile number, payment procedure and other similar kinds of information. When a customer browses Hello Food’s website or app, the system will automatically receive the computer’s internet protocol (IP) address in order to provide information that helps us to learn about the customer's browser and operating system. With customer’s permission, the company may send emails to him/her about our offers, campaigns, new categories and products, and other helpful updates.</p>
        </div>
      </PrivacyContainer>
      <Footer />
    </>
  );
};

const PrivacyContainer = styled.div`
margin: 20px;
  h2 {
    text-align: center;
  }
  h2 > span {
    border-bottom: 2px solid green;
  }
  .paragraph {
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

export default PrivacyPolicy;
