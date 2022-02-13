import styled from 'styled-components'

const ContainerOne = styled.div`
  background-image: url(${props => props.bgimage});
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default ContainerOne
