import styled, { css } from "styled-components";

const horizontal = css`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const vertical = css`
  flex-direction: column;
  justify-content: center;
  gap: 1.6rem;
`;

const Row = styled.div`
  display: flex;
  ${(props) => (props.type === "horizontal" ? horizontal : vertical)}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
