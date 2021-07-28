import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const FieldWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  direction: rtl;
`;

const Heading = styled.div`
  text-align: right;
  font-family: ${themeGet('fontFamily.body')};
  font-size: ${themeGet('fontSizes.md', '19')}px;
  font-weight: ${themeGet('fontWeights.bold', '700')};
  color: ${themeGet('colors.text.bold', '#0D1136')};
  margin-bottom: 15px;
`;

export { FieldWrapper, Heading };
