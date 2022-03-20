import styled from "styled-components";

// Container for the skip & start buttons on the onboarding pages 
export const TwoButtonContainer = styled.SafeAreaView`
  flexDirection: row;
  alignSelf: center;
  position: absolute;
  bottom: 5%;
  right: 9%
`;

// Container for the back arrow button in the top-left corner 
export const BackButtonContainer = styled.SafeAreaView`
  alignItems: stretch;
  borderRadius: 10px;
  position: absolute; 
  left: 10px;
  top: 10px;
  flexDirection: row
`;

// Lines on the success page 
export const HorizontalLine = styled.SafeAreaView`
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
  backgroundColor: #FFFFFF;
  padding: 18px;
  marginTop: 200px
`;

// Container for the input boxes on onboarding pages
export const InputContainer = styled.SafeAreaView`
  alignSelf: center;
  width: 50%;
  height: 60px;
  borderRadius: 10px;
  backgroundColor: #FFFFFF;
`;

// Container for the title of the page at the top
export const PageTitleContainer = styled.SafeAreaView`
  width: 85%;
  height: 40px
`;

// Last row on the success page for multiple icons
export const SymptomIconContainer = styled.SafeAreaView`
  marginTop: 4px;
  flexDirection: row
`;

// Container for text and button in the same line 
export const TextButtonContainer = styled.SafeAreaView`
  flexDirection: row;
  alignSelf: center;
  bottom: -35%
`; 