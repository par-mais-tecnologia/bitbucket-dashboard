import styled, { css } from 'styled-components'

const Table = styled.table`
  empty-cells: show;
  border: 1px solid #cbcbcb;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;

  ${props => props.shadow && css`
    box-shadow: 6px 10px 20px #00000080;
  `}

  & > thead {
    color: #ffffff;
    text-align: left;
    vertical-align: bottom;
  }

  & td:first-child,
  & th:first-child {
    border-left-width: 0;
  }

  & td,
  & th {
    padding: 0.5em 1em;
    border-width: 0 0 1px;
    border-bottom: 1px solid #cbcbcb;
    margin: 0;
  }

  & td {
    background-color: transparent
  }

  & tr {
    height: 40px;
  }
`

export default Table