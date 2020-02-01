import styled from "styled-components";
import { darken } from "polished";

export const All = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  height: 100%;
  width: 100%;
  background: linear-gradient(-90deg, #0187ff, #2dcdff);
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  background: #f1f1f1;
  border-radius: 10px;

  @media (max-width: 500px) {
    height: 100%;
    width: 100%;
    margin: 0 auto;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  form {
    display: flex;
    justify-content: space-between;
    margin: 20px 10px 5px 10px;
    position: relative;

    @media (max-width: 600px) {
      display: flex;
      flex-direction: column;
    }

    input {
      width: 85%;
      position: relative;
      background: #f1f1f1;
      border: 0;
      height: 50px;
      padding: 0 5px;
      color: #455463;
      margin: 0 0 20px;
      border-bottom: 1px solid #455463;
      border-bottom-style: dotted;
      z-index: 2;
      &::placeholder {
        color: #455463;
      }

      @media (max-width: 1300px) {
        width: 70%;
      }

      @media (max-width: 600px) {
        width: 100%;
      }
    }
    button {
      width: 15%;
      margin: 15px 0 0 10px;
      height: 50px;
      background: #f1f1f1;
      font-weight: bold;
      color: #109fff;
      border: 1px solid #109fff;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.3s;
      &:hover {
        background: ${darken(0.1, "#109fff")};
        color: #f1f1f1;
      }

      @media (max-width: 1300px) {
        width: 30%;
      }

      @media (max-width: 600px) {
        width: 100%;
        margin: 0;
      }
    }
  }

  .info {
    margin: 0 0 10px 15px;
    line-height: 1.5em;
    text-align: left;

    strong {
      font-size: 18px;
    }
  }
`;

export const Map = styled.div`
  border: 1px solid #f1f1f1;
  border-radius: 3px;
`;
