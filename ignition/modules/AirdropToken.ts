import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AirdropTokenModule = buildModule("AirdropTokenModule", (m) => {

  const AirdropToken = m.contract("AirdropToken");

  return { AirdropToken };
});

export default AirdropTokenModule;
