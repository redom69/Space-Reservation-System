import styled from 'styled-components';

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledComponent: React.FC = () => <Button>Click Me</Button>;

export default StyledComponent;
