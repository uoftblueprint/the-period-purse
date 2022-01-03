import styled from "styled-components";

// Container for the Skip, Start buttons on onboarding pages 
export const TwoButtonContainer = styled.View`
  flexDirection: row;
  alignSelf: center;
  position: absolute;
  bottom: 70px;
  right: 40px
`;

// Container for the back arrow button 
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

// Lines on the Success page 
export const HorizontalLine = styled.View`
  borderBottomColor: #CFCFCF;
  borderBottomWidth: 1px
`; 
