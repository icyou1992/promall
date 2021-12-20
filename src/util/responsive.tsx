import { useMediaQuery } from 'react-responsive';

const LDevice = ({ children }: any) => {
  const LDevice = useMediaQuery({ query: "(min-device-width: 769px)", });
  return LDevice ? children : null
}

const MDevice = ({ children }: any) => {
  const MDevice = useMediaQuery({ query: "(max-device-width: 768px)", });
  return MDevice ? children : null
}

const SDevice = ({ children }: any) => {
  const SDevice = useMediaQuery({ query: "(min-device-width: 580px)", });
  return SDevice ? children : null
}

const XSDevice = ({ children }: any) => {
  const XSDevice = useMediaQuery({ query: "(max-device-width: 579px)", });
  return XSDevice ? children : null
}

const IsLDevice = () => {
  return useMediaQuery({ query: "(min-device-width: 769px)", });
}

const IsMDevice = () => {
  return useMediaQuery({ query: "(max-device-width: 768px)", });
}

const IsSDevice = () => {
  return useMediaQuery({ query: "(min-device-width: 580px)", });
}

const IsXSDevice = () => {
  return useMediaQuery({ query: "(max-device-width: 579px)", });
}


export { LDevice, MDevice, SDevice, XSDevice, IsLDevice, IsMDevice, IsSDevice, IsXSDevice }