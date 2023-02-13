import React from "react";
import styled from "styled-components";

const Spinner = () => {
  return (
    <Container>
      <div id="cover-spin"></div>
    </Container>
  );
};

const Container = styled.div`
  #cover-spin {
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(12, 12, 12, 0.281);
    z-index: 9999;
    display: block;
  }

  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  #cover-spin::after {
    content: "";
    display: block;
    position: absolute;
    left: 48%;
    top: 45%;
    width: 30px;
    height: 30px;
    border-style: solid;
    border-color: #10918a;
    border-top-color: transparent;
    border-width: 4px;
    border-radius: 50%;
    -webkit-animation: spin 0.8s linear infinite;
    animation: spin 0.8s linear infinite;
  }
`;

export default Spinner;

// import React from "react";
// import styled from "styled-components";

// const Spinner = () => {
//   return (
//     <Container>
//       <div class="lds-ripple">
//         <div></div>
//         <div></div>
//       </div>
//     </Container>
//   );
// };

// const Container = styled.div`
//   .lds-ripple {
//     display: inline-block;
//     position: relative;
//     width: 80px;
//     height: 80px;
//   }
//   .lds-ripple div {
//     position: absolute;
//     border: 4px solid #fff;
//     opacity: 1;
//     border-radius: 50%;
//     animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
//   }
//   .lds-ripple div:nth-child(2) {
//     animation-delay: -0.5s;
//   }
//   @keyframes lds-ripple {
//     0% {
//       top: 36px;
//       left: 36px;
//       width: 0;
//       height: 0;
//       opacity: 0;
//     }
//     4.9% {
//       top: 36px;
//       left: 36px;
//       width: 0;
//       height: 0;
//       opacity: 0;
//     }
//     5% {
//       top: 36px;
//       left: 36px;
//       width: 0;
//       height: 0;
//       opacity: 1;
//     }
//     100% {
//       top: 0px;
//       left: 0px;
//       width: 72px;
//       height: 72px;
//       opacity: 0;
//     }
//   }
// `;

// export default Spinner;
