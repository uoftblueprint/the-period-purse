import styled from "styled-components";

// Container for the skip & start buttons on the onboarding pages 
export const TwoButtonContainer = styled.View`
  flexDirection: row;
  alignSelf: center;
  position: absolute;
  bottom: 70px;
  right: 40px
`;

// Container for the back arrow button in the top-left corner 
export const BackButtonContainer = styled.View`
  alignItems: stretch;
  borderRadius: 10px;
  left: 10px;
  width: 90%;
  height: 54px;
  position: absolute; 
  top: 30px;
  flexDirection: row
`;

// Lines on the success page 
export const HorizontalLine = styled.View`
  borderBottomColor: #CFCFCF;
  borderBottomWidth: 1px
`; 

// Border for the boxes on the registration pages 
export const InputBorderContainer = styled.View`
  alignSelf: center;
  width: 90%;
  height: 80px;
  borderWidth: 2px;
  borderColor: #5A9F93;
  borderRadius: 10px;
  padding: 18px;
  marginTop: 200px
`;

export const InputContainer = styled.View`
  alignSelf: center;
  width: 50%;
  height: 7%;
  marginTop: 5%;
  borderRadius: 10px;
  backgroundColor: #FFFFFF;
`;

// Container for the title of the page at the top
export const PageTitleContainer = styled.View`
  width: 85%;
  height: 40px
`;

// Last row on the success page for multiple icons
export const SymptomIconContainer = styled.View`
  marginTop: 4px;
  flexDirection: row
`;

// Container for text and button in the same line 
export const TextButtonContainer = styled.View`
  flexDirection: row;
  alignSelf: center;
  bottom: -45%
`; 